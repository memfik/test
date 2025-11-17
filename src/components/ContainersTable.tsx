import { Table, Input, Tag, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import type { Key } from "react";
import { useContainersStore } from "../store/containers.store";
import type {
  Container,
  ContainerStatus,
  GridPosition,
} from "../types/containers";

//Дублирование( @todo вынести потом
const statusConfig: Record<ContainerStatus, { label: string; color: string }> =
  {
    in_transit: { label: "В пути", color: "green" },
    arrived: { label: "Прибыл", color: "yellow" },
    placed: { label: "Размещен", color: "blue" },
    awaiting_dispatch: { label: "Ожидает отправки", color: "red" },
  };

export const ContainersTable = ({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) => {
  const containers = useContainersStore((state) => state.containers);
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    return containers.filter((container) => {
      const matchesSearch =
        container.id.toLowerCase().includes(searchText.toLowerCase()) ||
        container.zone.toLowerCase().includes(searchText.toLowerCase());

      return matchesSearch;
    });
  }, [containers, searchText]);

  const columns: ColumnType<Container>[] = [
    {
      title: "Номер",
      dataIndex: "id",
      sorter: (a: Container, b: Container) => a.id.localeCompare(b.id),
      width: 200,
    },
    {
      title: "Зона",
      dataIndex: "zone",
      sorter: (a: Container, b: Container) => a.zone.localeCompare(b.zone),
      width: 200,
    },
    {
      title: "Позиция",
      dataIndex: "position",
      width: 200,
      render: (pos: GridPosition | null) =>
        pos ? (
          <Space>
            <Tag color="purple">X: {pos.x}</Tag>
            <Tag color="purple">Y: {pos.y}</Tag>
          </Space>
        ) : (
          <span className="text-gray-400 italic">Не размещен</span>
        ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      filters: Object.entries(statusConfig).map(([value, { label }]) => ({
        text: label,
        value,
      })),
      onFilter: (value: boolean | Key, record: Container) =>
        record.status === value,
      render: (status: ContainerStatus) => (
        <Tag color={statusConfig[status].color}>
          {statusConfig[status].label}
        </Tag>
      ),
      width: 200,
    },
    {
      title: "Обновлено",
      dataIndex: "lastUpdate",
      sorter: (a: Container, b: Container) =>
        new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime(),
      render: (date: string) => new Date(date).toLocaleString("ru-RU"),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Поиск по номеру или зоне..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        size="large"
      />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        onRow={(record) => ({
          onClick: () => onSelect(record.id),
          style: { cursor: "pointer" },
        })}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Всего: ${total}`,
        }}
        rowClassName="hover:bg-gray-50"
      />
    </div>
  );
};

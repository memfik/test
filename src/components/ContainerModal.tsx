import { Modal, Descriptions, Tag, Card, Spin, Space, Divider } from "antd";
import {
  ContainerOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getContainer } from "../api/containers";
import type { Container, ContainerStatus } from "@/types/containers";

const statusConfig: Record<ContainerStatus, { label: string; color: string }> =
  {
    in_transit: { label: "В пути", color: "green" },
    arrived: { label: "Прибыл", color: "yellow" },
    placed: { label: "Размещен", color: "blue" },
    awaiting_dispatch: { label: "Ожидает отправки", color: "red" },
  };

export const ContainerModal = ({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) => {
  const [data, setData] = useState<Container | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getContainer(id)
        .then(setData)
        .finally(() => setLoading(false));
    } else {
      setData(null);
    }
  }, [id]);

  return (
    <Modal
      open={!!id}
      onCancel={onClose}
      footer={null}
      width={600}
      title={
        <Space>
          <ContainerOutlined style={{ fontSize: 20, color: "#1890ff" }} />
          <span>Информация о контейнере</span>
        </Space>
      }
    >
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Загрузка данных..." />
        </div>
      ) : data ? (
        <div className="space-y-4">
          <Card size="small" className="bg-linear-to-r from-blue-50 to-cyan-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-xs mb-1">
                  Номер контейнера
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {data.id}
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div className="text-gray-500 text-xs mb-1">Статус</div>
                <Tag
                  color={statusConfig[data.status].color}
                  className="text-sm px-3 py-1"
                >
                  {statusConfig[data.status].label}
                </Tag>
              </div>
            </div>
          </Card>

          <Divider style={{ margin: "12px 0" }} />

          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item
              label={
                <Space>
                  <EnvironmentOutlined />
                  Зона
                </Space>
              }
            >
              <span className="font-medium">{data.zone}</span>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <AimOutlined />
                  Позиция
                </Space>
              }
            >
              {data.position ? (
                <Space>
                  <Tag color="purple">X: {data.position.x}</Tag>
                  <Tag color="purple">Y: {data.position.y}</Tag>
                </Space>
              ) : (
                <span className="text-gray-400 italic">Не размещен</span>
              )}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <ClockCircleOutlined />
                  Последнее обновление
                </Space>
              }
            >
              {new Date(data.lastUpdate).toLocaleString("ru-RU")}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : null}
    </Modal>
  );
};

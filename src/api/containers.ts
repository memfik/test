import axios from "axios";
import type { Container } from "@/types/containers";

export const getContainers = () =>
  axios.get<Container[]>("/containers.json").then((res) => res.data);

export const getContainer = (id: string) =>
  axios
    .get<Container[]>("/containers.json")
    .then((res) => res.data.find((item) => item.id === id)!);

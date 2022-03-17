export interface DockerService {
  serviceID: string;
  name: string;
  mode: 'replicated' | 'global';
  replicas: {
    available: number;
    unavailable: number;
  };
  image: string;
  portMapping?: string;
}
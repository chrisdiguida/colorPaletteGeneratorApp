export interface AppNotification {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title: string;
  fadeIn?: boolean;
}

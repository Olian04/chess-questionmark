export interface ISnackbar {
  open: boolean;
  severity: 'info' | 'success' | 'warning' | 'error';
  duration: number;
  message: string;
}

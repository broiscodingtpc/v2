import { apiService, Alert } from './api';
import { formatSteampunkMessage, formatAlert } from '../utils/formatter';

export class AlertService {
  async getUserAlerts(userId: string): Promise<Alert[]> {
    try {
      return await apiService.getAlerts(userId);
    } catch (error) {
      console.error('Error getting user alerts:', error);
      return [];
    }
  }

  async createAlert(userId: string, alertData: Omit<Alert, 'id' | 'userId' | 'createdAt'>): Promise<Alert> {
    try {
      return await apiService.createAlert(userId, alertData);
    } catch (error) {
      console.error('Error creating alert:', error);
      throw error;
    }
  }

  async updateAlert(alertId: string, alertData: Partial<Alert>): Promise<Alert> {
    try {
      return await apiService.updateAlert(alertId, alertData);
    } catch (error) {
      console.error('Error updating alert:', error);
      throw error;
    }
  }

  async deleteAlert(alertId: string): Promise<void> {
    try {
      await apiService.deleteAlert(alertId);
    } catch (error) {
      console.error('Error deleting alert:', error);
      throw error;
    }
  }

  async formatAlertsMessage(alerts: Alert[]): Promise<string> {
    if (alerts.length === 0) {
      return formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║          🔔 NO ALERTS SET 🔔          ║
╚═══════════════════════════════════════╝

You haven't set any price alerts yet.
Use the menu to create your first alert!
      `);
    }

    let message = formatSteampunkMessage(`
╔═══════════════════════════════════════╗
║           🔔 YOUR ALERTS 🔔           ║
╚═══════════════════════════════════════╝

    `);

    alerts.forEach((alert, index) => {
      message += formatAlert(alert) + '\n\n';
      if (index < alerts.length - 1) {
        message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      }
    });

    return message;
  }

  getAlertTypeEmoji(type: string): string {
    switch (type) {
      case 'price_above':
        return '📈';
      case 'price_below':
        return '📉';
      case 'volume_spike':
        return '📊';
      case 'market_cap':
        return '💰';
      default:
        return '🔔';
    }
  }
}

export const alertService = new AlertService();
export function isLeadClosed(status: string): boolean {
  return status === 'closed_won' || status === 'closed_lost';
}

export function isValidStatus(status: string): boolean {
  const validStatuses = ['new', 'contacted', 'qualified', 'closed_won', 'closed_lost'];
  return validStatuses.includes(status);
}
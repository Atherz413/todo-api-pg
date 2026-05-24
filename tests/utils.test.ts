import { isLeadClosed, isValidStatus } from '../src/utils/leadUtils';

describe('isLeadClosed', () => {
  it('should return true for closed_won', () => {
    expect(isLeadClosed('closed_won')).toBe(true);
  });

  it('should return true for closed_lost', () => {
    expect(isLeadClosed('closed_lost')).toBe(true);
  });

  it('should return false for active status', () => {
    expect(isLeadClosed('new')).toBe(false);
  });
});

describe('isValidStatus', () => {
  it('should return true for valid status', () => {
    expect(isValidStatus('qualified')).toBe(true);
  });

  it('should return false for invalid status', () => {
    expect(isValidStatus('pending')).toBe(false);
  });
});
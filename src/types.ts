/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  category: 'Market Research' | 'Marketing & Branding' | 'Training & Consulting';
  consultationType: 'in-person' | 'virtual' | 'phone';
  date: string;
  time: string;
  description: string;
  status: 'pending' | 'approved' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export type PageId =
  | 'home'
  | 'about'
  | 'market-research'
  | 'marketing-branding'
  | 'training-consulting'
  | 'clients'
  | 'book-online'
  | 'contact';

export interface Amount {
  id: number;
  name: string;
  amount: number;
  createdAt: Date;
}

export interface listAmountSelected extends Omit<Amount, 'createdAt'> {}

export interface CreateAmount extends  Omit<Amount, 'id' | 'createdAt'> {}

export interface Get {
  statusCode: number;
  message: string;
}

export interface UpdateAMount extends Get {
  data: Amount
}

export interface DeleteAmount extends Get {
  data: number
}

export interface GetAllAmount extends Get {
  data: Amount[];
}

export interface GetOneAmount extends Get {
  data: Amount;
}

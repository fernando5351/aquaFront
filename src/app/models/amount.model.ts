export interface Amount {
  id: number,
  name: string,
  amount: number,
  createdAt: string
}

export interface CreateAmount extends Omit<Amount, 'id' | 'createdAt'> {}


export interface getAmount {
  statusCode: number,
  message: '',
  data: Amount
}


export interface DeleteAmount {
  statusCode: number,
  message: '',
  data: number
}

export interface updateAmount {
  name: string,
  amount: number
}

export interface getAmounts extends Omit<getAmount,'data'>{
  data: Array<Amount>
}

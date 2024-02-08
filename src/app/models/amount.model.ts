export interface Amount {
  id: 0,
  amount: 0,
  createdAt: string
}

export interface createAmount extends Omit<Amount, 'id'> {}

export interface getAmount {
  statusCode: 0,
  message: '',
  data: Amount
}

export interface updateModel {
  amount: 0
}

export interface getAmounts extends Omit<getAmount,'data'>{
  data: Array<Amount>
}

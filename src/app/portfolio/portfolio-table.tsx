'use client'

import { useMemo } from 'react'
import { formatter } from '@/utils/formatter'
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
} from '@tremor/react'
import { usePortfolio } from '../portfolio-provider'
import { cn } from '@/utils/cn'
import { Allocation } from './allocation'

export function PortfolioTable() {
  const portfolio = usePortfolio()
  const totalBalance = useMemo(() => {
    const result = portfolio.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    )
    return result
  }, [portfolio])
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between lg:flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-medium lg:text-3xl">Total Balance</h2>
          <p
            className={cn(
              'mt-1 text-xl lg:text-2xl',
              totalBalance > 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            ${formatter.format(totalBalance)}
          </p>
        </div>

        <Allocation portfolio={portfolio} />
      </div>
      <Card className="mt-6 ring-transparent dark:border-slate-700 dark:bg-slate-800">
        <Title className="text-slate-800 dark:text-slate-200">
          Transactions
        </Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Price
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Quantity
              </TableHeaderCell>
              <TableHeaderCell className="text-slate-800 dark:text-slate-200">
                Total Cost
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-slate-200 dark:divide-slate-700">
            {portfolio.map((coin, idx) => (
              <TableRow key={idx}>
                <TableCell className="border-none text-slate-900 dark:text-slate-50">
                  {coin.name}
                </TableCell>
                <TableCell className="text-slate-800 dark:text-slate-200">
                  ${formatter.format(coin.price)}
                </TableCell>
                <TableCell className="text-slate-800 dark:text-slate-200">
                  {coin.quantity}
                </TableCell>
                <TableCell
                  className={cn(
                    'border-none text-green-500',
                    coin.quantity < 0 && 'text-red-500'
                  )}
                >
                  $
                  {coin.quantity < 0
                    ? formatter.format(coin.cost).slice(1)
                    : formatter.format(coin.cost)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

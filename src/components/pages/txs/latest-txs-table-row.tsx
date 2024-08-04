import Link from "next/link";
import { TransactionWithReceipt } from "@/lib/types";
import { formatTimestamp, formatEther, formatGwei } from "@/lib/utils";
import { TableRow, TableCell } from "@/components/ui/table";
import TxMethodBadge from "@/components/lib/tx-method-badge";
import CopyButton from "@/components/lib/copy-button";

const LatestTxsTableRow = ({
  transaction,
  timestampFormattedAsDate,
  txGasPriceShown,
}: {
  transaction: TransactionWithReceipt;
  timestampFormattedAsDate: boolean;
  txGasPriceShown: boolean;
}) => {
  const { distance, utc } = formatTimestamp(transaction.timestamp);
  return (
    <TableRow>
      <TableCell className="max-w-40">
        <div className="flex">
          <Link
            href={`/tx/${transaction.hash}`}
            className="truncate text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {transaction.hash}
          </Link>
          <CopyButton
            content="Copy Hash to clipboard"
            copy={transaction.hash}
          />
        </div>
      </TableCell>
      <TableCell>
        <TxMethodBadge
          selector={transaction.input.slice(0, 10)}
          signature={transaction.signature}
        />
      </TableCell>
      <TableCell>
        <Link
          href={`/block/${transaction.blockNumber}`}
          className="text-sm font-medium leading-none text-primary hover:brightness-150"
        >
          {transaction.blockNumber.toString()}
        </Link>
      </TableCell>
      <TableCell suppressHydrationWarning>
        {timestampFormattedAsDate ? utc : distance}
      </TableCell>
      <TableCell className="max-w-40">
        <div className="flex">
          <Link
            href={`/address/${transaction.from}`}
            className="truncate text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {transaction.from}
          </Link>
          <CopyButton
            content="Copy Address to clipboard"
            copy={transaction.from}
          />
        </div>
      </TableCell>
      <TableCell className="max-w-40">
        <div className="flex">
          <Link
            href={`/address/${transaction.to}`}
            className="truncate text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {transaction.to}
          </Link>
          <CopyButton
            content="Copy Address to clipboard"
            copy={transaction.to ?? ""}
          />
        </div>
      </TableCell>
      <TableCell>{formatEther(transaction.value, 15)} ETH</TableCell>
      <TableCell>
        {txGasPriceShown
          ? formatGwei(transaction.receipt.effectiveGasPrice)
          : formatEther(
              transaction.receipt.effectiveGasPrice *
                transaction.receipt.gasUsed,
              8,
            )}
      </TableCell>
    </TableRow>
  );
};

export default LatestTxsTableRow;

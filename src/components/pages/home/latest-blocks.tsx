import Link from "next/link";
import { Box } from "lucide-react";
import { BlockWithTransactions } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";

const LatestBlock = ({
  block,
  l2BlockTime,
}: {
  block: BlockWithTransactions;
  l2BlockTime: bigint;
}) => (
  <div className="flex items-center gap-4 pt-6">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
      <Box className="h-5 w-5" />
    </div>
    <div className="grid flex-grow gap-1">
      <div className="flex items-center justify-between gap-1 py-0.5 text-sm">
        <div>
          <Link
            href={`/block/${block.number}`}
            className="text-sm font-medium leading-none text-primary hover:brightness-150"
          >
            {block.number.toString()}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatTimestamp(block.timestamp, false)}
          </p>
        </div>
        <div className="ml-auto text-sm font-medium">
          <Link
            href={`/block/${block.number}/txs`}
            className="text-primary hover:brightness-150"
          >
            {block.transactions.length} txn
            {block.transactions.length === 1 ? "" : "s"}
          </Link>{" "}
          <span className="text-muted-foreground">
            in {l2BlockTime.toString()} secs
          </span>
        </div>
      </div>
    </div>
  </div>
);

const LatestBlocks = ({
  blocks,
  l2BlockTime,
}: {
  blocks: BlockWithTransactions[];
  l2BlockTime: bigint;
}) => (
  <Card>
    <CardHeader className="border-b">
      <CardTitle>Latest Blocks</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-6 divide-y">
      {blocks.map((block) => (
        <LatestBlock key={block.hash} block={block} l2BlockTime={l2BlockTime} />
      ))}
    </CardContent>
    <CardFooter className="flex justify-center border-t">
      <Link href="/blocks" className="pt-6 text-primary hover:brightness-150">
        View all blocks →
      </Link>
    </CardFooter>
  </Card>
);

export default LatestBlocks;

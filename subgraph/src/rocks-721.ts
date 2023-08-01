import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MetadataUpdated as MetadataUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Purchase as PurchaseEvent,
  Transfer as TransferEvent
} from "../generated/Rocks721/Rocks721"
import {
  Approval,
  ApprovalForAll,
  MetadataUpdated,
  OwnershipTransferred,
  Purchase,
  Transfer,
  Holder,
  Token,
} from "../generated/schema"
import {BigInt, Bytes} from "@graphprotocol/graph-ts";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMetadataUpdated(event: MetadataUpdatedEvent): void {
  let entity = new MetadataUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newTokenUriBase = event.params.newTokenUriBase

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePurchase(event: PurchaseEvent): void {
  let entity = new Purchase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.price = event.params.price
  entity.tokenIds = event.params.tokenIds

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

const ONE = BigInt.fromString('1');

const createNewHolder = (id: Bytes): Holder => {
  const holder = new Holder(id);
  holder.count = BigInt.fromString('0');
  holder.save();

  return holder;
};

const createNewToken = (tokenId: BigInt, holder: Bytes): Token => {
  const token = new Token(tokenId.toHexString());

  token.holder = holder;
  token.tokenId = tokenId;
  token.save();

  return token;
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const fromHolder = Holder.load(entity.from) || createNewHolder(entity.from);
  const toHolder = Holder.load(entity.to) || createNewHolder(entity.to);


  if (!fromHolder || !toHolder) return;

  const token = Token.load(event.params.tokenId.toHexString()) || createNewToken(event.params.tokenId, fromHolder.id);

  if (!token) return;

  if (fromHolder.count.gt(ONE)) fromHolder.count = fromHolder.count.minus(ONE);

  toHolder.count = toHolder.count.plus(ONE);

  token.holder = toHolder.id;

  fromHolder.save();
  toHolder.save();
  token.save();

}

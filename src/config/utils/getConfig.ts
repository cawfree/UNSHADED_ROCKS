import {parseEther} from 'ethers';
import moment from 'moment';
import {GalleryEnvironment} from 'gallery-sdk';
import {$enum} from 'ts-enum-util';

const {
  VITE_JSON_RPC_URL,
  VITE_RELAUNCH_BLOCK,
  VITE_RELAUNCH_DATETIME,
  VITE_CLAIM_SNAPSHOT_DATETIME,
  VITE_CLAIM_END_DATETIME,
  VITE_SITE_BASE_NAME,
  VITE_GALLERY_API_URL,
  VITE_GALLERY_ENVIRONMENT,
} = import.meta.env as Partial<{
  readonly VITE_JSON_RPC_URL: string;
  readonly VITE_RELAUNCH_BLOCK: string;
  readonly VITE_RELAUNCH_DATETIME: string;
  readonly VITE_CLAIM_SNAPSHOT_DATETIME: string;
  readonly VITE_CLAIM_END_DATETIME: string;
  readonly VITE_SITE_BASE_NAME: string;
  readonly VITE_GALLERY_API_URL: string;
  readonly VITE_GALLERY_ENVIRONMENT: string;
}>;

if (typeof VITE_JSON_RPC_URL !== 'string' || !VITE_JSON_RPC_URL.length)
  throw new Error('Expected non-empty string VITE_JSON_RPC_URL.');

if (typeof VITE_RELAUNCH_DATETIME !== 'string' || !VITE_RELAUNCH_DATETIME.length)
  throw new Error('Expected non-empty string VITE_RELAUNCH_DATETIME.');

if (typeof VITE_CLAIM_SNAPSHOT_DATETIME !== 'string' || !VITE_CLAIM_SNAPSHOT_DATETIME.length)
  throw new Error('Expected non-empty string VITE_CLAIM_SNAPSHOT_DATETIME.');

if (typeof VITE_CLAIM_END_DATETIME !== 'string' || !VITE_CLAIM_END_DATETIME.length)
  throw new Error('Expected non-empty string VITE_CLAIM_END_DATETIME.');

if (typeof VITE_SITE_BASE_NAME !== 'string')
  throw new Error('Expected string VITE_SITE_BASE_NAME.');

if (![...$enum(GalleryEnvironment).values()].map(String).includes(String(VITE_GALLERY_ENVIRONMENT)))
  throw new Error(`Expected VITE_GALLERY_ENVIRONMENT, encountered "${
    String(VITE_GALLERY_ENVIRONMENT)
  }".`);

// HACK: VITE_RELAUNCH_BLOCK is allowed to be a valid
// integer, an empty string, or undefined.

const validRelaunchBlock = VITE_RELAUNCH_BLOCK === undefined || typeof VITE_RELAUNCH_BLOCK === 'string' && (
     !VITE_RELAUNCH_BLOCK.length
  || String(parseInt(VITE_RELAUNCH_BLOCK)) === VITE_RELAUNCH_BLOCK
);

if (!validRelaunchBlock)
  throw new Error(`Expected integer or undefined VITE_RELAUNCH_BLOCK, encountered "${
    String(VITE_RELAUNCH_BLOCK)
  }".`);

if (typeof VITE_GALLERY_API_URL !== 'string' || !VITE_GALLERY_API_URL.length)
  throw new Error(`Expected non-empty string VITE_GALLERY_API_URL, encountered "${
    String(VITE_GALLERY_API_URL)
  }".`);

export const getConfig = () => ({
  maximumFeePerMint: parseEther('1'),
  rocksContractAddress: '0xfda1d24E927f8DA58f86F653E976cb1F7e6CC9b7' as `0x${string}`,
  reapersGambitContractAddress: '0x2c91d908e9fab2dd2441532a04182d791e590f2d' as `0x${string}`,
  wrappedReaperContractAddress: '0xec91e38a6bd8d25c582d86becdad2003a25deecc' as `0x${string}`,
  startBlock: 13745557,

  relaunchBlock: typeof VITE_RELAUNCH_BLOCK === 'string' && Boolean(String(VITE_RELAUNCH_BLOCK).length)
    ? BigInt(VITE_RELAUNCH_BLOCK)
    : undefined,
  // TODO: this should be inferred from relaunchBlock
  relaunchDate: moment(VITE_RELAUNCH_DATETIME),

  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/cawfree/unshaded-rocks',
  burnAddress: '0x000000000000000000000000000000000000dead',
  // HACK: Must be either a localhost URL or an alchemy URL. No other RPCs will function.
  rpcUrl: VITE_JSON_RPC_URL,
  claimSnapshotDate: moment(VITE_CLAIM_SNAPSHOT_DATETIME),
  claimEndDate: moment(VITE_CLAIM_END_DATETIME),
  siteBaseName: VITE_SITE_BASE_NAME,

  // @ts-expect-error sanitized
  galleryEnvironment: GalleryEnvironment[VITE_GALLERY_ENVIRONMENT],

});

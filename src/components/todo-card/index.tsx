import React from 'react';
import {
	useAddress,
	useContract,
	useContractRead,
	useContractWrite,
	useSDK,
	useSwitchChain,
} from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import { ABI, CONTRACT_ADDRESS } from '~/utils';
import { Button } from 'antd';

// Icons
import { PiCheckCircleBold } from 'react-icons/pi';

interface TodoItem {
	metadata: string;
	address: string;
	completed: boolean;
}

interface Metadata {
	title: string;
	description: string;
	timestamp: number;
}

interface Props {
	id: number;
}

const TodoCard = ({ id }: Props) => {
	const sdk = useSDK();
	const address = useAddress();
	const switchChain = useSwitchChain();
	const { contract } = useContract(CONTRACT_ADDRESS, ABI);
	const { data } = useContractRead(contract, 'todosForOwner', [address, id]) as {
		data: TodoItem | undefined;
	};
	const { mutateAsync, isLoading } = useContractWrite(
		contract,
		'markAsComplete'
	);

	const [metadata, setMetadata] = React.useState<Metadata | null>(null);

	const onMarkAsComplete = async () => {
		try {
			await switchChain(Sepolia.chainId);
			await mutateAsync({
				args: [id],
			});
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		async function fetchMetadata() {
			try {
				if (data) {
					// eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
					const json = (await sdk?.storage.downloadJSON(data.metadata)) as Metadata;
					setMetadata(json);
				}
			} catch (error) {}
		}
		void fetchMetadata();
	}, [data]);

	if (data && metadata)
		return (
			<div className='flex flex-col items-center justify-between gap-4 rounded-md border-[1px] border-gray-300 p-4 sm:flex-row'>
				<div className='flex flex-col'>
					<div className='text-xl'>
						<span className='font-semibold'>Title: </span>
						<span>{metadata.title}</span>
					</div>
					<div className='text-xl'>
						<span className='font-semibold'>Description: </span>
						<span>{metadata.description}</span>
					</div>
					<div className='text-xl'>
						<span className='font-semibold'>Date Added: </span>
						<span>{new Date(metadata.timestamp * 1000).toLocaleString()}</span>
					</div>
				</div>
				<div>
					{data.completed ? (
						<div className='flex flex-row items-center gap-2 text-xl font-semibold text-green-400'>
							<PiCheckCircleBold className='text-2xl text-green-400' />
							Completed
						</div>
					) : (
						<Button
							className='bg-primary'
							type='primary'
							size='middle'
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={onMarkAsComplete}
							disabled={isLoading}
						>
							Mark as Complete
						</Button>
					)}
				</div>
			</div>
		);
};

export default TodoCard;

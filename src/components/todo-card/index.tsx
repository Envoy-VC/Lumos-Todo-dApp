import React from 'react';
import {
	useAddress,
	useContract,
	useContractRead,
	useContractWrite,
	useSDK,
} from '@thirdweb-dev/react';
import { ABI } from '~/utils';
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
	const address = useAddress();
	const sdk = useSDK();
	const { contract } = useContract(
		'0x3a3bd560198fCD376f852fE7E3846CFa3e9e6cd9',
		ABI
	);
	const { data } = useContractRead(contract, 'todosForOwner', [address, id]) as {
		data: TodoItem | undefined;
	};
	const { mutateAsync } = useContractWrite(contract, 'markAsComplete');

	const [metadata, setMetadata] = React.useState<Metadata | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const onMarkAsComplete = async () => {
		try {
			setIsLoading(true);
			await mutateAsync({
				args: [id],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
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
			<div className='flex flex-col sm:flex-row items-center justify-between rounded-md border-[1px] border-gray-300 p-4 gap-4'>
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

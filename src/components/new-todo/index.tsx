import React from 'react';
import {
	useContract,
	useContractWrite,
	useSDK,
	useSwitchChain,
} from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains';
import { Modal, Input, Button } from 'antd';

import { ABI, CONTRACT_ADDRESS } from '~/utils';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTodo = ({ open, setOpen }: Props) => {
	const sdk = useSDK();
	const switchChain = useSwitchChain();
	const { contract } = useContract(CONTRACT_ADDRESS, ABI);
	const { mutateAsync } = useContractWrite(contract, 'addTodo');

	const [title, setTitle] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [isUploading, setIsUploading] = React.useState<boolean>(false);

	const onClose = () => {
		setOpen(false);
	};

	const onAdd = async () => {
		if (title === '' || description === '') return;
		try {
			await switchChain(Sepolia.chainId);
			setIsUploading(true);
			const metadata = {
				title,
				description,
				timestamp: Math.round(Date.now() / 1000),
			};
			const hash = await sdk?.storage.upload(metadata);
			console.log(hash);
			await mutateAsync({
				args: [hash],
			});
			onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Modal
			title='New Todo'
			open={open}
			footer={null}
			onCancel={onClose}
			destroyOnClose
		>
			<div className='flex flex-col gap-4'>
				<Input
					placeholder='Title'
					size='large'
					onChange={(e) => setTitle(e.target.value)}
					disabled={isUploading}
				/>
				<Input.TextArea
					rows={6}
					placeholder='Description'
					size='large'
					onChange={(e) => setDescription(e.target.value)}
					disabled={isUploading}
				/>
				<Button
					type='primary'
					className='bg-primary'
					size='large'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={onAdd}
					disabled={isUploading}
				>
					Add Todo
				</Button>
			</div>
		</Modal>
	);
};

export default NewTodo;

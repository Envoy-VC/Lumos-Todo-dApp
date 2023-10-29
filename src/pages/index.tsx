import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react';
import { Button } from 'antd';
import { TodoCard, NewTodo } from '~/components';
import { ABI } from '~/utils';
import type { BigNumber } from 'ethers';

const Home: NextPageWithLayout = () => {
	const address = useAddress();

	const { contract } = useContract(
		'0x3a3bd560198fCD376f852fE7E3846CFa3e9e6cd9',
		ABI
	);

	const [open, setOpen] = React.useState<boolean>(false);

	const { data } = useContractRead(contract, 'todoIndex', [address]) as {
		data: BigNumber;
	};

	if (!address) {
		return (
			<div className='p-16 text-center text-lg font-semibold'>
				Connect Wallet to se your Todo
			</div>
		);
	} else {
		if (data)
			return (
				<div className='flex flex-col gap-4 p-4 sm:p-24'>
					<div className='flex flex-row items-center justify-between'>
						<div className='text-5xl'>Your Todos</div>
						<Button
							className='bg-primary'
							type='primary'
							size='large'
							onClick={() => setOpen(true)}
						>
							New
						</Button>
					</div>
					<div className='flex flex-col gap-2'>
						{Array(data.toNumber())
							.fill(1)
							.map((_, index) => (
								<TodoCard id={index} key={index} />
							))}
					</div>
					<NewTodo open={open} setOpen={setOpen} />
				</div>
			);
		else
			return (
				<div className='flex h-screen justify-center p-4 sm:p-24'>loading</div>
			);
	}
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;

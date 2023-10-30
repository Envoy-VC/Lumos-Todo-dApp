export const CONTRACT_ADDRESS = '0x3a3bd560198fCD376f852fE7E3846CFa3e9e6cd9';

export const ABI = [
	{
		inputs: [
			{
				internalType: 'string',
				name: 'metadata',
				type: 'string',
			},
		],
		name: 'addTodo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256',
			},
		],
		name: 'markAsComplete',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'todoIndex',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'todosForOwner',
		outputs: [
			{
				internalType: 'string',
				name: 'metadata',
				type: 'string',
			},
			{
				internalType: 'address',
				name: 'owner',
				type: 'address',
			},
			{
				internalType: 'bool',
				name: 'completed',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];

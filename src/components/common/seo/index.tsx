import { NextSeo } from 'next-seo';

const SEO = () => {
	return (
		<NextSeo
			title='Decentralized Todo App'
			description='A simple todo application built using Next.js, Tailwind CSS, and thirdweb'
			openGraph={{
				url: 'https://lumos-todo-dapp.vercel.app/',
				title: 'Decentralized Todo App',
				description:
					'A simple todo application built using Next.js, Tailwind CSS, and thirdweb',
				images: [
					{
						url: 'https://i.ibb.co/zxK1JJH/OG.png',
						width: 1200,
						height: 630,
						alt: 'Decentralized Todo App OG Image',
						type: 'image/png',
					},
				],
				siteName: 'Decentralized Todo App',
			}}
			twitter={{
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default SEO;

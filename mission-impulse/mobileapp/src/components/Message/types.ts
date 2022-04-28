type TMessageProps = {
	id: string;
	text: string;
	user: {
		name: string;
		avatar_url: string;
	};
};

type TProps = {
	data: TMessageProps;
};

export type { TMessageProps, TProps };

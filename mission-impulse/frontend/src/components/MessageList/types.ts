type TMessage = {
	id: string;
	text: string;
	user: {
		name: string;
		avatar_url: string;
	};
};

export type { TMessage };

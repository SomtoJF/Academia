import { LoadingOutlined } from "@ant-design/icons";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import "./ErrorBoundary.small.styles.sass";

interface props {
	refetch?: (
		variables?: Partial<OperationVariables> | undefined
	) => Promise<ApolloQueryResult<any>>;
	loading: boolean;
	variables?: any;
	message: string;
}

export default function ErrorBoundary({
	refetch,
	loading,
	variables,
	message,
}: props) {
	return (
		<div className="error-boundary">
			<p>{message}</p>
			{refetch && (
				<button
					type="button"
					disabled={loading}
					onClick={() => {
						refetch(variables);
					}}
				>
					{loading ? <LoadingOutlined /> : "Reload"}
				</button>
			)}
		</div>
	);
}

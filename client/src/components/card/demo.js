//how to create a card with react?
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bikeId: null,
			data: [],
		};
	}

	getBikes = () => {
		try {
			return axios.get('URL');
		} catch (error) {
			console.error(error);
		}
	};
	componentDidMount() {
		const breeds = this.getBikes()
			.then((response) => {
				if (response) {
					this.setState({
						data: response.data.message,
						bikeId: response.data.message[0].bikeId,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div style={{ display: 'flex' }}>
				{this.state.data.map((item, index) => {
					return (
						<div key={index} style={{ width: '300px' }}>
							<Cards value={item} />
						</div>
					);
				})}
			</div>
		);
	}
}

class Contacts extends React.Component{
	constructor(props){
		super(props);
		this.state={isLogin:false,onBacket:0};
		this.onBacket=this.onBacket.bind(this);
		this.exit=this.exit.bind(this);
	}
	onBacket(){
		if((this.state.onBacket==null)||(this.state.onBacket==0)){
			return;
		}else{
			return(
				<div id="counter">
					{this.state.onBacket}
				</div>
			);
		}
	}
	exit(e){
		e.preventDefault();
		let self=this;
		$.ajax({
			type:"POST",
			url:"php/exit.php",
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				document.location.href="main.html";
				self.setState({isLogin:false});
			}
		});
	}
	componentWillMount(){
		let self = this;
		$.ajax({
			type:"POST",
			url:"php/login.php",
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				console.log(data);
				let autory=JSON.parse(data);
				console.log(autory);
				if(autory[0]){
					self.setState({isLogin:true});
				}else{
					return;
				}
			}
		});
		$.ajax({
			type:"POST",
			url:"php/counter.php",
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				console.log(data);
				var count=JSON.parse(data);
				self.setState({onBacket:count});
			}
		});
	}
	render(){
		if(this.state.isLogin==true){
			return (
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="main.html"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Backet.html">Корзина
										{this.onBacket()}
									</a>
								</li>
								<li className="nav-item active">
									<a className="nav-link" href="#">Контакты</a>
								</li>
								<li className="nav-item">
										<a className="nav-link" href="login.html">К профилю</a>
									</li>
								<li className="nav-item right-L cf" id="login">
									<a className="nav-link" href="main.html" onClick={this.exit}>Выйти</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			)
		}else{
			return(
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="#main.html"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Backet.html">Корзина
										{this.onBacket()}
									</a>
								</li>
								<li className="nav-item active">
									<a className="nav-link disabled" href="#">Контакты</a>
								</li>
								<li className="nav-item right-L cf" id="login">
									<a className="nav-link" href="login.html">Войти</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			);
		}
	}
}

ReactDOM.render(<Contacts/>,document.getElementById('head'));
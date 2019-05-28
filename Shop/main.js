class Head extends React.Component{
	constructor(props){
		super(props);
		this.state={products:[], onReady:false,isLogin:false,onBacket:0}; // информация о товарах:images(ссылка на картинку),price(цена),name(имя),about(о товаре),stock(наличие товара у нас). onReady - если данные загрузились, отрисовываем страницу
		this.each=this.each.bind(this);
		this.exit=this.exit.bind(this);
		this.onBacket=this.onBacket.bind(this);
		this.pushToBacket=this.pushToBacket.bind(this);
		this.key=0;
	}
	genNewKey(){
        this.key++;
        return(this.key);
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
	each (item,i){	// отрисовываем панельку каждого товара один за одним
		let self = this;
		return(
			<div className="container-fluid row fullWidth" key={self.genNewKey()} >
				<div className="col-md-3 col-xs-6 col-sm-5 col-lg-2">
					<br/>
					<div className="text-center">
						<img src={this.state.products[i].images} width="150px" height="150px" index={i} />
						<p className="text-center"><b> Цена:</b> {this.state.products[i].price} грн</p>
					</div>
				</div>
				<br/>
				<div className="col-md-7 col-xs-6 col-sm-7 col-lg-8">
				<br/>
					<p className="text-justify"><b>Товар:</b> {this.state.products[i].name}</p>
					<p className="text-justify"><b>Описание:</b> {this.state.products[i].about}</p>
					<p><b>Наличие:</b> {this.state.products[i].stock}</p>
				</div>
				<div className="col-md-2 col-xs-12 col-sm-12 col-lg-2 withBTN text-center">
					<br/>
					<button className="btn btn-info" id="listen" onClick={this.pushToBacket.bind(this.pushToBacket,this.state.products[i].id,this.state.products[i].name,this.state.products[i].price)} id={this.state.products[i].id} data-toggle="modal" data-target="#exampleModal">Добавить в корзину</button>
				</div>
			</div>
			);
	}
	pushToBacket(id,name,price){ // положить в корзину(id-int,name-string,price-int)
		let self=this;
		$.ajax({
			type:"POST",
			url:"php/addToBacket.php",
			data:{"id":id,"name":name,"price":price,"many":1},
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				$.ajax({
					type:"POST",
					url:"php/counter.php",
					success:function(data,code){
						if(code==200){
							console.log(data);
						}else{
							console.log(code);
						}
						//ставим длину в счетчик	
						console.log(data);
						var count=JSON.parse(data);
						//если счетчик равен 0, мы его скрываем
						self.setState({onBacket:count});
					}
				});
			}
		});
	}
	componentWillMount(){
		let self = this;
		$.ajax({		// получаем данные
			type:"POST",
			url:"php/products.php",
			success: function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				//console.log(data);
				var product=JSON.parse(data);
				self.setState({products:product,onReady:true});
			}
		});
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
		if(this.state.onReady==false){
			return(
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="#"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item active">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Backet.html">Корзина</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Contacts.html">Контакты</a>
								</li>
								<li className="nav-item right-L cf" id="login">
									<a className="nav-link" href="login.html">Загрузка...</a>
								</li>
							</ul>
						</div>
					</nav>
					<h3 className="text-center">Данные загружаются</h3>
				</div>
				)
		}else{
			if(this.state.isLogin==true){
				return (
					<div className="container-fluid noPadding">
						<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
							<a className="navbar-brand" href="#"><img src="icon.png" width="40px" height="40px"/></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<a className="nav-link" href="#">Главная</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Backet.html">Корзина
											{this.onBacket()}
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Contacts.html">Контакты</a>
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
						<div className="container-fluid">
							{this.state.products.map (this.each)}
						</div>
					</div>
				)
			}else{
				return(
					<div className="container-fluid noPadding">
						<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
							<a className="navbar-brand" href="#"><img src="icon.png" width="40px" height="40px"/></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item active">
										<a className="nav-link disabled" href="#">Главная</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Backet.html">Корзина
											{this.onBacket()}
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Contacts.html">Контакты</a>
									</li>
									<li className="nav-item right-L cf" id="login">
										<a className="nav-link" href="login.html">Войти</a>
									</li>
								</ul>
							</div>
						</nav>
						<div className="container-fluid">
							{this.state.products.map (this.each)}
						</div>
					</div>
				);
			}
		}
	}
}

ReactDOM.render(<Head />,document.getElementById('head'));
class Backet extends React.Component {
	constructor(props){
		super(props);
		this.state={products:[],onReady:false,onProgress:"Data is loading",isLogin:false,onBacket:0};
		this.each=this.each.bind(this);
		this.remove=this.remove.bind(this);
		this.removeAll=this.removeAll.bind(this);
		this.getSum=this.getSum.bind(this);
		this.exit=this.exit.bind(this);
		this.onBacket=this.onBacket.bind(this);
		this.getOrders=this.getOrders.bind(this);
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
	each(item,i){
		let self=this;
		return (
			<tr key={self.genNewKey()}>
				<td>{i+1}.</td>
				<td>{this.state.products[i].name}</td>
				<td>{this.state.products[i].price}</td>
				<td>{this.state.products[i].many}</td>
				<td>{this.state.products[i].price*this.state.products[i].many}</td>
				<td><button className="btn btn-default" index={i} onClick={this.remove.bind(this.remove,i)}><img width="20px" height="20px" src="krestik.png"/></button></td>
			</tr>
		)	;
	}
	remove(i){
		let self=this;
		var arr = this.state.products;
		$.ajax({
			type:"POST",
			url:"php/remove.php",
			data:{"i":i},
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				arr.splice(i,1);
				var onBack=this.state.onBacket;
				onBack--;
				self.setState({products:arr,onBacket:onBack});
			}
		});
	}
	removeAll(){
		let self=this;
		var arr=[];
		$.ajax({
			type:"POST",
			url:"php/removeAll.php",
			success: function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				self.setState({products:arr,onProgress:"Ваша корзина пуста",onReady:false,onBacket:0});
			}
		});
	}
	getSum(){
		var sum=0;
		for(var i=0;i<this.state.products.length;i++){
			sum=sum+this.state.products[i].price*this.state.products[i].many;
		}
		return sum;
	}
	BacketIsNull(){
		this.setState({onProgress:"Ваша корзина пуста"});
	}
	getOrders(e){
		e.preventDefault();
		var name=this.refs.name.value;
		var mail=this.refs.mail.value;
		var phone=this.refs.phone.value;
		var comments=this.refs.comments.value;
		let self=this;
		var nameChecked,mailChecked,phoneChecked;
		if(name.length<2){
			nameChecked=false;
			alert("Неверно заполненое поле ФИО");
		}else{
			nameChecked=true;
		}
		if(mail.length<7){
			mailChecked=false;
			alert("Неверно указанный e-mail");
		}else{
			mailChecked=true;
		}
		if(phone.length<3){
			phoneChecked=false;
			alert("неверно указанный номер телефона");
		}else{
			phoneChecked=true;
		}
		if(nameChecked&&mailChecked&&phoneChecked){
		//первый аякс: добавляем заказ в базу данных
			$.ajax({
				type:"POST",
				url:"php/orders.php",
				data:{
					"userName":name,
					"email":mail,
					"phone":phone,
					"comment":comments,
					"orders":self.state.products
					},
				success: function(data,code){
					if(code==200){
						console.log(data);
					}else{
						console.log(code);
					}
					console.log(data);
					// второй аякс: если первый успешен, очищаем корзину
					// запускаем функции removeAll
					self.removeAll();
				}
			});
		}
	}
	componentWillMount(){
		let self=this;
		$.ajax({
			type:"POST",
			url:"php/Backet.php",
			success: function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				var product=JSON.parse(data);
				if(product.length==0){
					self.BacketIsNull();
					console.log(data);
				}else{
					console.log(product);
					self.setState({products:product,onReady:true});
				}
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
		if((!this.state.onReady)&&(this.state.isLogin)){
			return(
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="main.html"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item active">
									<a className="nav-link" href="Backet.html">Корзина</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Contacts.html">Контакты</a>
								</li>
								<li className="nav-item">
										<a className="nav-link" href="login.html">К профилю</a>
									</li>
								<li className="nav-item right-L cf" id="login">
									<a className="nav-link" href="#" onClick={this.exit}>Выйти</a>
								</li>
							</ul>
						</div>
					</nav>
					<h3 className="text-center">{this.state.onProgress}</h3>
				</div>
			)
		}
		if((!this.state.onReady)&&(!this.state.isLogin)){
			return(
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="main.html"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item active">
									<a className="nav-link" href="Backet.html">Корзина</a>
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
					<h3 className="text-center">{this.state.onProgress}</h3>
				</div>
			)
		}
		if((!this.state.isLogin)&&(this.state.onReady)){
			return (
				<div className="container">
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
									<li className="nav-item active">
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
					</div>
					<div className="container text-center">
						<table className="table text-center table-hover">
							<tbody>
								<tr>
									<td></td>
									<td className="font-weight-bold">Наименование</td>
									<td className="font-weight-bold">Цена</td>
									<td className="font-weight-bold">Количество</td>
									<td className="font-weight-bold">Стоимость</td>
									<td></td>
								</tr>
								{this.state.products.map (this.each)}
							</tbody>
						</table>
						<p id="sum"> Итого: {this.getSum()}</p>
						<p><button onClick={this.removeAll} className="bg-warning btn btn-sm">Очистить</button></p>
						<button className="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Оформить заказ</button>
					</div>
					<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">Оформление заказа</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<form id="contactForm">
										<div className="form-group">
											<label htmlFor="name">Ваше ФИО:*</label>
											<input id="name" className="form-control" name="name" required type="text" placeholder="Введите вашу фамилию" ref="name"/>
										</div>
										<div className="form-group">
											<label htmlFor="email">Ваш E-mail:*</label>
											<input id="email" className="form-control" name="email" required type="email" placeholder="Введите ваш email" ref="mail"/>
										</div>
										<div className="form-group">
											<label htmlFor="phone">Ваш телефон:*</label>
											<input id="phone" className="form-control" name="phone" required type="text" placeholder="Введите ваш номер телефона" ref="phone"/>
										</div>
										<div className="form-group">
											<label htmlFor="message">Комментарий к заказу:</label>
											<textarea id="message" className="form-control" name="message" rows="4" placeholder="Ваши комментарии" ref="comments"></textarea>
										</div>
										<button id="button" className="btn btn-success" onClick={this.getOrders} data-dismiss="modal">Оформить заказ</button>
									</form>
								</div>
							</div>
						</div>				
					</div>
				</div>
				);
			}
		if((this.state.isLogin)&&(this.state.onReady)){
			return(
					<div className="container">
						<div className="container-fluid noPadding">
							<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
								<a className="navbar-brand" href="main.html"><img src="icon.png" width="40px" height="40px"/></a>
								<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
								</button>
								<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
									<ul className="navbar-nav mr-auto">
										<li className="nav-item">
											<a className="nav-link" href="main.html">Главная</a>
										</li>
										<li className="nav-item active">
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
											<a className="nav-link" href="login.html" onClick={this.exit}>Выйти</a>
										</li>
									</ul>
								</div>
							</nav>
						</div>
						<div className="container text-center">
							<table className="table text-center table-hover">
								<tbody>
									<tr>
										<td></td>
										<td className="font-weight-bold">Наименование</td>
										<td className="font-weight-bold">Цена</td>
										<td className="font-weight-bold">Количество</td>
										<td className="font-weight-bold">Стоимость</td>
										<td></td>
									</tr>
									{this.state.products.map (this.each)}
								</tbody>
							</table>
							<p id="sum"> Итого: {this.getSum()}</p><p><button onClick={this.removeAll} className="bg-warning btn btn-sm">Очистить</button></p>
							<button className="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModal">Оформить заказ</button>
						</div>
						<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">Оформление заказа</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<form id="contactForm">
											<div className="form-group">
												<label htmlFor="name">Ваше ФИО:*</label>
												<input id="name" className="form-control" name="name" required type="text" placeholder="Введите вашу фамилию" ref="name"/>
											</div>
											<div className="form-group">
												<label htmlFor="email">Ваш E-mail:*</label>
												<input id="email" className="form-control" name="email" required type="email" placeholder="Введите ваш email" ref="mail"/>
											</div>
											<div className="form-group">
												<label htmlFor="phone">Ваш телефон:*</label>
												<input id="phone" className="form-control" name="phone" required type="text" placeholder="Введите ваш номер телефона" ref="phone"/>
											</div>
											<div className="form-group">
												<label htmlFor="message">Комментарий к заказу:</label>
												<textarea id="message" className="form-control" name="message" rows="4" placeholder="Ваши комментарии" ref="comments"></textarea>
											</div>
											<button id="button" className="btn btn-success" onClick={this.getOrders} data-dismiss="modal">Оформить заказ</button>
										</form>
									</div>
								</div>
							</div>				
						</div>
					</div>
				);
			}
		
	}
}
ReactDOM.render(<Backet />,document.getElementById('root'));
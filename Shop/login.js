class UserAbilyties extends React.Component{
	constructor(props){
		super(props);
		this.state={isLogin:false,view:"products",products:[],orders:[],onEdit:false,editData:[]};
		this.startLogin=this.startLogin.bind(this);
		this.showOrdersOn=this.showOrdersOn.bind(this);
		this.showProductsOn=this.showProductsOn.bind(this);
		this.eachProducts=this.eachProducts.bind(this);
		this.eachOrders=this.eachOrders.bind(this);
		this.eachOrdersOrders=this.eachOrdersOrders.bind(this);
		this.deleteOrder=this.deleteOrder.bind(this);
		this.addNewProduct=this.addNewProduct.bind(this);
		this.deleteProduct=this.deleteProduct.bind(this);
		this.startRedact=this.startRedact.bind(this);
		this.saveChanges=this.saveChanges.bind(this);
		this.exitWithoutChanges=this.exitWithoutChanges.bind(this);
		this.exit=this.exit.bind(this);
		this.key=0;
	}
	
	
	
	// ФУНКЦИИ ДЛЯ ОТОБРАЖЕНИЯ ТОВАРОВ
	
	eachProducts(item,i){	// вторая функция отрисовки товаров
		return(
			<div className="container-fluid" key={this.genNewKey}>
				<div className="alert alert-success">
					<h5>Название: {this.state.products[i].name}</h5>
					<hr/>
					<p><b>Фото: </b><img className="fixedImg" src={this.state.products[i].images}/></p>
					<p><b>Цена: </b>{this.state.products[i].price}</p>
					<p><b>О товаре: </b>{this.state.products[i].about}</p>
					<p><b>Наличие: </b>{this.state.products[i].stock}</p>
					<hr/>
					<div className="container text-center">
						<div className="btn-group">
							<div className="btn btn-warning btn-md" onClick={this.startRedact.bind(this.startRedact,i)}>
								Редактировать
							</div>
							<div className="btn btn-danger btn-md" onClick={this.deleteProduct.bind(this.deleteProduct,item.id,i)}>
								Удалить
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	exitWithoutChanges(e){	// отмена редактирования
		e.preventDefault();
		var lostArr=this.state.editData;
		var arr=this.state.products;
		arr.push(lostArr);
		this.setState({products:arr,editData:[],onEdit:false});
	}
	saveChanges(e){	// сохранить изменения 
		e.preventDefault();
		let self=this;
		console.log(this.refs);
		console.log(this.refs.NewN);
		var id=this.state.editData[0].id;
		var name=this.refs.NewN.value;
		var price=this.refs.NewP.value;
		var stock=this.refs.NewS.value;
		var images=this.state.editData[0].images;
		var about=this.refs.NewA.value;
		var obj={
			'id':id,'name':name,'price':price,'stock':stock,'images':images,'about':about
		};
		$.ajax({
			type:"POST",
			url:"php/updateChanges.php",
			data:{
				'id':id,
				'name':name,
				'price':price,
				'stock':stock,
				'images':images,
				'about':about},
			success:function(data,code){
				if(code==200){
					console.log(data);
				}else{
					console.log(code);
				}
				console.log(data);
				var arr=self.state.products;
				arr.push(obj);
				self.setState({onEdit:false,products:arr,editData:[]})
			}
		})
	}
	startRedact(i){	// начать редактирование
		var editProducts=this.state.products[i];
		var array=this.state.products;
		array.splice(i,1);
		var arr=[];
		arr.push(editProducts);
		console.log(arr);
		this.setState({products:array,editData:arr,onEdit:true});
	}
	showProductsOn(){	// функция с которой начинается отрисовка
		if(this.state.onEdit==false){	// здесь находится ссылка на функцию отрисовки товаров и модалка добавления
		return(
			<div className="container-fluid">
				<div className="container-fluid text-center M-top M-bottom">
					<button className="btn btn-primary btn-md" data-toggle="modal" data-target="#exampleModal">Добавить товар</button>
				</div>
				{this.state.products.map(this.eachProducts)}
				<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Добавление товара</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form id="exampleModal">
									<div className="form-group">
										<label htmlFor="name">Наименование:</label>
										<input className="form-control" name="name" required type="text" placeholder="Введите название товара" ref="name"/>
									</div>
									<div className="form-group">
										<label htmlFor="name">Описание товара:</label>
										<textarea className="form-control" name="name" placeholder="Введите описание товара" rows="3" ref="about"></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="name">Наличие:</label>
										<select  className="custom-select" name="name" required type="text" ref="stock" multiple>
											<option disabled>Выберите наличие товара на складе</option>
											<option value="Есть на складе">Есть на складе</option>
											<option value="Нет на складе">Нет на складе</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="name">Цена товара:</label>
										<input className="form-control" name="name" required type="text" placeholder="Введите цену товара" ref="price"/>
									</div>
									<div className="lins">
										<button  className="btn btn-primary" data-dismiss="modal" onClick={this.addNewProduct}>Добавить товар</button>
									</div>
								</form>
							</div>
						</div>
					</div>        
				</div>
			</div>
		);
		}else{
			// окно редактирования
			return(
				<div className="form-group">
					<form>
						<div className="form-group col-md-12">
							<label htmlFor="name">Наименование:</label>
							<textarea  className="form-control" name="names" rows="2" defaultValue={this.state.editData[0].name} ref="NewN"></textarea>
						</div>
						<div className="form-group col-md-12">
							<label htmlFor="name">Описание товара:</label>
							<textarea  className="form-control" name="names" rows="3" defaultValue={this.state.editData[0].about} ref="NewA"></textarea>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="name">Наличие:</label>
							<select multiple  className="custom-select" required type="text" ref="NewS">
								<option disabled>Выберите наличие товара на складе</option>
								<option value="Есть в наличии">Есть в наличии</option>
								<option value="Нет в наличии">Нет в наличии</option>
							</select>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="name">Цена товара:</label>
							<input  className="form-control" name="names" required type="text" defaultValue={this.state.editData[0].price} ref="NewP"/>
						</div>
						<div className="container-fluid text-center">
							<div className="btn-group">
								<button className="btn btn-success" data-dismiss="modal" onClick={this.saveChanges}>Подтвердить</button>
								<button className="btn btn-warning" onClick={this.exitWithoutChanges}>Отмена</button>
							</div>
						</div>
					</form>       
				</div>
			);
		}
	}
	addNewProduct(e){
		e.preventDefault();
		let self=this;
		var name=this.refs.name.value;
		var images="https://via.placeholder.com/150x150.png";
		var price=this.refs.price.value;
		var stock=this.refs.stock.value;
		var about=this.refs.about.value;
		var obj={'name':name,'images':images,'price':price,'stock':stock,'about':about};
		$.ajax({
			type:"POST",
			url:"php/addNewProduct.php",
			data:{
				"name":name,
				"images":images,
				"price":price,
				"stock":stock,
				"about":about
			},
			success:function(data,code){
				if(code==200){
				console.log(data);
				}else{
				console.log(code);
				}
				console.log(data);
				var arr=self.state.products;
				arr.push(obj);
				self.setState({products:arr});
			}
		});
	}
	deleteProduct (id,i){
		var q=confirm ('Вы дейстивтельно хотите удалить?');
		if(q){
			let self=this;
			$.ajax({
				type:"POST",
				url:"php/deleteProduct.php",
				data:{'id':id},
				success: function (data,code){
					if (code==200){
					console.log(data);
					}else{
						console.log(code);
					}
					console.log(data);
					var arr=self.state.products;
					arr.splice(i,1);
					alert('Товар удален!');
					self.setState({products:arr});
				}
			});
		}else{
			return;
		}
	}
	
	
	
	
	
	// ФУНКЦИИ ЗАКАЗОВ
	
	showOrdersOn(){	// начальная функция отрисовки заказов
		return(
			<div className="container-fluid">
				{this.state.orders.map(this.eachOrders)}
			</div>
		);
	}
	eachOrders(item,i){	// вторичная функция отрисовки заказов
		return(
			<div className="container-fluid alert alert-primary" key={this.genNewKey}>
				<h5>Заказчик: {this.state.orders[i].userName}</h5>
				<h5>Номер телефона: {this.state.orders[i].phone}</h5>
				<h5>E-mail: {this.state.orders[i].email}</h5>
				<hr/>
				<h6>Пожелания:</h6>
				<p>{this.state.orders[i].comment}</p>
				<hr/>
				<h5>Заказанный товар:</h5>
				<table className="table table-hover">
					<tbody>
					{this.state.orders[i].orders.map(this.eachOrdersOrders)}
					</tbody>
				</table>
				<div className="container text-center">
					<div className="btn btn-danger btn-md" onClick={this.deleteOrder.bind(this.deleteOrder,item.id,i)}>
						Удалить
					</div>
				</div>
			</div>
		);
	}
	eachOrdersOrders(item,i){	// последняя функция отрисовки заказов
		return(
			<tr key={this.genNewKey}>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>{item.many}</td>
				<td>{item.price*item.many}</td>
			</tr>
		);
	}
	deleteOrder(id,i){
		let self=this;
		$.ajax({
			type:"POST",
			url:"php/deleteOrder.php",
			data:{'id':id},
			success:function(data,code){
				if(code==200){
				console.log(data);
			}else{
				console.log(code);
			}
			console.log(data);
			var arr=self.state.orders;
			arr.splice(i,1);
			self.setState({orders:arr});
			}
		});
	}
	
	
	
	
	
	// ФУНКЦИЯ ВХОДА(ЛОГИНА) И ВЫХОДА
	
	startLogin(e){ // начинаем авторизацию
		e.preventDefault();
		let self=this;
		// берем данные: пароль и логин
		var log=this.refs.log.value;
		var userPass=this.refs.userPass.value;
		// проверяем не являются ли поля пустыми
		if((log.length>0)&&(userPass.length>0)){
			$.ajax({
				type:"POST",
				url:"php/startLogin.php",
				data:{
					"login":log,
					"password":userPass
				},
				success:function(data,code){
					if(code==200){
						console.log(data);
					}else{
						console.log(code);
					}
					console.log(data);
					let autory=JSON.parse(data);	// получаем либо true либо false
					//console.log(autory);
					if(autory[0]){
						// если да, то проверяем его на админа, если да, то ставим isAdmin в true
						$.ajax({
							type:"POST",
							url:"php/products.php",
							success:function(data,code){
								if(code==200){
									console.log(data);
								}else{
									console.log(code);
								}
								//console.log(data);
								var products=JSON.parse(data); // получаем список товаров
								self.setState({products:products});
							}
						});
						$.ajax({
							type:"POST",
							url:"php/getOrders.php",
							success:function(data,code){
								if(code==200){
									console.log(data);
								}else{
									console.log(code);
								}
								//console.log(data);
								var orders=JSON.parse(data);	// получаем список заказов
								for(var i=0;i<orders.length;i++){
									orders[i].orders=JSON.parse(orders[i].orders); // получаем список заказанных товаров
								}
								self.setState({orders:orders});
							}
						});
						self.setState({isLogin:true});	// Вход разрешен
					}else{
						alert('Неверный пароль или логин');
					}
				}
			});
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
	
	
	// ФУНКЦИИ ПОСТРОЕНИЯ 
	
	genNewKey(){
        this.key++;
        return(this.key);
    }
	componentWillMount(){
		// Если возвращает true, то мы залогинены, если false - нет.
		let self=this;
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
				if (autory[0]){
					// если да, то проверяем его на админа, если да, то ставим isAdmin в true. Также загружаем данные о товарах и заказах
					$.ajax({
						type:"POST",
						url:"php/products.php",
						success:function(data,code){
							if(code==200){
								console.log(data);
							}else{
								console.log(code);
							}
							//console.log(data);
							var products=JSON.parse(data);	// получили список товаров
							self.setState({products:products});
						}
					});
					$.ajax({
						type:"POST",
						url:"php/getOrders.php",
						success:function(data,code){
							if(code==200){
								console.log(data);
							}else{
								console.log(code);
							}
							//console.log(data);
							var orders=JSON.parse(data);	// получили список заказов
							for(var i=0;i<orders.length;i++){
								orders[i].orders=JSON.parse(orders[i].orders); // получили список заказанных товаров
							}
							self.setState({orders:orders});
						}
					});
					self.setState({isLogin:true});
				}else{
					return;
				}
			}
		});			
	}
	render(){
		// если пользователь незалогиненый, сначала выведем форму входа
		if(!this.state.isLogin){
				return (
					<div className="container-fluid noPadding">
						<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
							<a className="navbar-brand" href="#"><img src="icon.png" width="40px" height="40px"/></a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item">
										<a className="nav-link" href="main.html">Главная</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Backet.html">Корзина</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="Contacts.html">Контакты</a>
									</li>
								</ul>
							</div>
						</nav>
						<div className="container-fluid">
							<form>
								<div className="form-row">
									<div className="col-md-5 M-bottom">
										<input type="text" name="userLogin" className="form-control" ref="log" placeholder="login"/>
									</div>
									<div className="col-md-4 M-bottom">
										<input type="password" className="form-control" name="userPass" ref="userPass" placeholder="password"/>
									</div>
									<div className="col-md-3 collapsedButton">
										<button className="btn btn-md btn-success" onClick={this.startLogin}>Войти</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				);
		}else{
			// если пользователь (Админ) залогинен, ему видны 2 вкладки: Товары и заказы. Вкладка товар установлена по умолчанию.
			return(
				<div className="container-fluid noPadding">
					<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
						<a className="navbar-brand" href="#"><img src="icon.png" width="40px" height="40px"/></a>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse noPadding" id="navbarCollapse">
							<ul className="navbar-nav mr-auto">
								<li className="nav-item">
									<a className="nav-link" href="main.html">Главная</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Backet.html">Корзина</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="Contacts.html">Контакты</a>
								</li>
								<li className="nav-item right-L cf" id="login">
									<a className="nav-link" href="main.html" onClick={this.exit}>Выйти</a>
								</li>
							</ul>
						</div>
					</nav>
					<div className="container-fluid">
						<div className="container-fluid row">
							<div className="col-sm-2 col-1 col-md-3 col-lg-4"></div>
							<div className="col-sm-8 col-10 col-md-6 col-lg-4">
								<ul className="nav nav-tabs text-center" id="myTab" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="home-tab" data-toggle="tab" href="#products" role="tab" aria-controls="home" aria-selected="true">Товары</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="profile-tab" data-toggle="tab" href="#orders" role="tab" aria-controls="profile" aria-selected="false">Заказы</a>
									</li>
								</ul>
							</div>
							<div className="col-sm-2 col-1 col-md-3 col-lg-4"></div>
						</div>
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="products" role="tabpanel" aria-labelledby="home-tab">{this.showProductsOn()}</div>
							<div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="profile-tab">{this.showOrdersOn()}</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

ReactDOM.render(<UserAbilyties/>,document.getElementById('head'));
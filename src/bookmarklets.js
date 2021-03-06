var bookmarklets;
(function (){
	"use strict";
	bookmarklets = {
		loginLogout:{
			function: function() {
				if(!ECPack.account.isLogged()){
					var loginName = '{loginLogout.name}';
					if (loginName.indexOf('%isoCode%') > -1) {
						loginName = loginName.replace('%isoCode%', _$Os.isoCode().toLowerCase());
					}
//					ECPack.account.login('{loginLogout.name}' + '.' + _$Os.isoCode().toLowerCase() + '@' + '{loginLogout.host}', '{loginLogout.password}');
					ECPack.account.login(loginName, '{loginLogout.password}');
				} else {
					ECPack.account.logout();
				}
			},
			options: {
				"loginLogout.name": 'test.%isoCode%@yoox.com',
				"loginLogout.password": 'password'
			},
			wildcards: {
				"name": {
					value: "%isoCode%",
					assign: false,
					description: "isocode della country attuale"
				}
			}
		},
		addItemToCart: {
			function: function(){
//			TODO Generalizzare la funzione per i vari siti
				_$Y.watch('ECPack.search:SearchFull', function(data){
					var items = data.Results.Items;
					var item = items[Math.floor(Math.random()*items.length)];
					ECPack.cart.addItem(item.DefaultCode10, item.Sizes[0].Id);
				});

				var dep = Navigation.SITE_CODE.indexOf("THECORNER") === 0 ? "tcwoman": "ssshoesw";

				ECPack.search.getSearchFull({
					department: dep,
					productsPerPage: 10,
					sortRule: 'PriceAscending'
				});
			}
		},
		openTimedLayer: {
			function: function(){
				//TODO testare
//			%7Bfunction%20deleteSession()%7Bvar%20timeToReplace%3Bvar%20myooxTime%20%3D%20_%24Y.cookie.get('MYOOX'%2C%20'TIME')%3Bvar%20accountTime%20%3D%20_%24Y.cookie.get('ACCOUNT'%2C%20'TIME')%3Bif%20(myooxTime)%20%7BtimeToReplace%20%3D%20myooxTime.substring(0%2C%20myooxTime.length-2)%20%2B%20'00'%3B_%24Y.cookie.setProps('MYOOX'%2C%20%7B%20'TIME'%20%3A%20timeToReplace%20%7D)%3B%7Dif%20(accountTime)%20%7BtimeToReplace%20%3D%20accountTime.substring(0%2C%20accountTime.length-2)%20%2B%20'00'%3B_%24Y.cookie.setProps('ACCOUNT'%2C%20%7B%20'TIME'%20%3A%20timeToReplace%20%7D)%3B%7D%7DdeleteSession()%7D
				var timeToReplace;
				var myooxTime = _$Y.cookie.get('MYOOX', 'TIME');
				var accountTime = _$Y.cookie.get('ACCOUNT', 'TIME');
				if (myooxTime) {
					timeToReplace = myooxTime.substring(0, myooxTime.length-2) + '00';
					_$Y.cookie.setProps('MYOOX', { 'TIME' : timeToReplace });
				}
				if (accountTime) {
					timeToReplace = accountTime.substring(0, accountTime.length-2) + '00';
					_$Y.cookie.setProps('ACCOUNT', { 'TIME' : timeToReplace });
				}
			}
		},
		delNewsLetterLayerCookie: {
			function: function(){
				_$Y.cookie.del('LAYER_NL');
			}
		},
		addAddressBook: {
			function: function(){
				//TODO testare per cina e giappone
				$.get('http://randomuser.me/g/', function(data) {
					ECPack.account.addUserAddressBook({
						address: 'via di qua',
						city: 'Bulagna',
						province: 'BO',
						email: data.results[0].user.email,
						name: data.results[0].user.name.first,
						surname: data.results[0].user.name.last,
						zipCode: 12345,
						phone: 123456789
					});
				});

			}
		},
		toggleEditable: {
			function: function(){
				var $body = $('body');
				if($body.attr('contenteditable')){
					$body.removeAttr('contenteditable');
				}
				else {
					$('body').attr('contenteditable', true);
				}
			}
		},
		lidChecker: {
			function: function(){
				//TODO dismettere
				$("a:not([name^='&lid'])").css('border', "1px solid red");
			}
		},
		marker: {
			function: function(){
				//TODO dismettere
				var div = document.createElement("div");
				div.id = "markerRecap";
				document.body.insertBefore(div, document.body.firstChild);

				$('#markerRecap').css({
					'position': 'fixed',
					'top': '10px',
					'left': '10px',
					'width': '150px',
					'height': '200px',
					'z-index': '99999'
				});

				var text = document.createElement("textarea");
				text.id = "markerOutput";
				text.style.height = '100%';
				div.appendChild(text);

				$('body').on('click', '.itemThumb', function(e) {
					e.preventDefault();
					var mark = 'mark';

					var hasMark = $(this).hasClass(mark);

					if (!hasMark) {
						$(this).addClass(mark).css('background', "green");
					} else {
						$(this).removeClass(mark).css('background', "none");
					}
					var list = '';

					$('.itemThumb.mark a[data-itemlink] [itemprop="image"]').each(function() {
						list += _$Os.codFromImage($(this).attr('src'), false) + '\n';
					});
					$('#markerOutput').html(list);
				});
			}
		},
		toggleDevice: {
			function: function(){
				//RESOURCEINFO basta per thecorner e shoescribe. Per gli altri siti servono anche MOBILEINFO e UI
				if((_$Y.cookie.get('RESOURCEINFO') !== null && _$Y.cookie.get('RESOURCEINFO').indexOf('DEVICE=smartphone') > -1)||
					(_$Y.cookie.get('MOBILEINFO') !== null && _$Y.cookie.get('MOBILEINFO').indexOf('MOBILE=1') > -1)) {
					_$Y.cookie.del('RESOURCEINFO');
					_$Y.cookie.del('MOBILEINFO');
					if(_$Y.cookie.get('UI') !== null)
						_$Y.cookie.set('UI',_$Y.cookie.get('UI').replace('DEVICE=smartphone','DEVICE=desktop'));
				}
				else {
					_$Y.cookie.set('RESOURCEINFO', 'DEVICE=smartphone&ORIGINALDEVICE=smartphone', 365);
					_$Y.cookie.set('MOBILEINFO', 'MOBILE=1', 365);
					if(_$Y.cookie.get('UI') !== null)
						_$Y.cookie.set('UI',_$Y.cookie.get('UI').replace('DEVICE=desktop','DEVICE=smartphone'), 365);
				}
				location.reload();
			}
		},
		setSrcMode: {
			function: function(){
				//TODO Testare
				_$Y.cookie.set('SRCMODE', '1', 365);
				location.reload();
			}

		}
	};

})();
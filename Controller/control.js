angular.module('template', ['ngRoute', 'ngAnimate'])
    .controller('mainCtr',function($scope,$rootScope,$location,$http){
         $rootScope.jump = function(p) {
             $location.path(p);
         }
         $rootScope.showBar = function(){
             var left_bar = document.querySelector('#left-bar');
             left_bar.style.width = document.body.clientWidth*(0.8) + 'px';
             left_bar.style.height = document.body.clientHeight + 'px';
             left_bar.onclick = function(){
                 this.style.display = "none";
             }
             console.log(left_bar);
             console.log(document.body.clientWidth);
         }
         $scope.title = '阿狸之家';
         $scope.leftsrc = 'Style/img/iconfont-miaojiesellerscan.png';
         $scope.rightsrc = 'Style/img/iconfont-552cd52eeea1e.png';
         $scope.back = 'javascript:;';

        $http.get('Data/goods.json').success(function(data){
              $scope.goods = data;
        });
    })
    .controller('goodDetailCtr',function($scope,$http,$routeParams){
        $scope.title = '忍者世界';
        $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
        $scope.back = '#/main';
           $http.get('Data/goods.json').success(function(data){
                      $scope.good = data[$routeParams.id-1];
           });
    })
    .controller('searchCtr',function($scope,$http){
            $scope.isLoading = true;
            $scope.hasMore = true;
        $http.get("Data/search_list.json").success(function(data){
            $scope.searchList = data;
            $scope.isLoading = false;
        });
        //加载更多数据
        $scope.loadMore = function(){}


    })
    .controller('searchInfoCtr',function($scope,$routeParams,$http){
           $http.get("Data/search_list.json").success(function(data){
                //while($routeParams.id){
               //     $scope.search_list = data[0];
               // }

               $scope.search_list=data[$routeParams.id-1];
               console.log(data[$routeParams.id-1])
           });
    })
    .controller('loginCtr',function($scope){
         $scope.title = '用户登录';
         $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
         $scope.rightsrc = 'Style/img/iconfont-552cc1a8a92a6.png';
         $scope.back = '#/main';
    })
    .controller('registerCtr',function($scope){
          var user = document.getElementById('username_reg');
           user.onclick = function(){
               alert(1);
           }
            user.onblur= function(){
                alert(1);
            }
        $scope.title = '用户注册';
        $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
        $scope.rightsrc =  'Style/img/iconfont-552cc1a8a92a6.png';
        $scope.back = '#/user_login_form';
    })
    .controller('newsListCtr',function($scope,$http){
        $scope.title = '阿狸卫报';
        $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
        $scope.back = '#/main';

        $http.get('Data/news_list.json').success(function(data){
            $scope.news = data;
        });
    })
    .controller('newsListInfoCtr',function($scope,$http,$routeParams){
        $scope.title = '新闻抄底';
        $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
        $scope.back = '#/news_list';

        $http.get('Data/news_list.json').success(function(data){
            $scope.newsInfo=data[$routeParams.id-1];
        });

    })
    .controller('shopListCtr',function($scope,$http){
        $scope.title = '购物车';
        $scope.leftsrc = 'Style/img/iconfont-arrowleft.png';
        $scope.back = '#/main';

        $http.get('Data/shopcart_list.json').success(function(data){
              $scope.shopcartlist = data;
        });

    }).config(function($routeProvider){

        $routeProvider
            .when('/main',{
                templateUrl:'Template/main.html',
                controller:'mainCtr'
            })
            .when('/goods_detail/:id',{
                templateUrl:'Template/Public_Tpl/goods_detail.html',
                controller:'goodDetailCtr'
            })
            .when('/search_list',{
                templateUrl:'Template/Service_Module/Search_Box/search_list.html',
                controller:'searchCtr'
            })
            .when('/search_list_info/:id',{
                templateUrl:'Template/Service_Module/Search_Box/search_list_info.html',
                controller:'searchInfoCtr'
            })
            .when('/user_login_form',{
                templateUrl:'Template/Public_Tpl/user_login_form.html',
                controller:'loginCtr'
            })
            .when('/user_register_form',{
                templateUrl:'Template/Public_Tpl/user_register_form.html',
                controller:'registerCtr'
            })
            .when('/news_list',{
                templateUrl:'Template/Service_Module/News/news_list.html',
                controller:'newsListCtr'
            })
            .when('/news_list_info/:id',{
                templateUrl:'Template/Service_Module/News/news_list_info.html',
                controller:'newsListInfoCtr'
            })
            .when('/shopcart_list',{
                templateUrl:'Template/Service_Module/Shopping_Cart/shopcart_list.html',
                controller:'shopListCtr'
            })
            .when('/my_order',{
                templateUrl:'Template/Service_Module/Shop_Order/my_order.html',
                controller:'myOrderCtr'
            })
            .otherwise({
                redirectTo: '/main'
            })

    })

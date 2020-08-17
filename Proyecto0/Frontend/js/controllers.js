app.directive('myclick', function() {
    return function(scope, element, attrs) {
        element.bind('touchstart click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            scope.$apply(attrs['myclick']);
        });
    };
});

app.controller("Filter", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d

        $scope.menu = Array.from(new Set($scope.data[0].data.map(s => s.Departamento)))
            .map(Departamento => {
                return {
                    Departamento: String($scope.data[0].data.find(s => s.Departamento === Departamento).Departamento)
                }   
            });      
    });
});

app.controller("Hosp_PubN1", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });

        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM","Camas_Interm_Adultos_Pri_NORM",
                "Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM","Camas_Intens_Adultos_Pri_NORM",
                "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN1_NORM;
            delete $scope.filtered[key].Camas_Adultos_PubN1_NORM;
            $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN1_NORM;
            delete $scope.filtered[key].Camas_Intens_Adultos_PubN1_NORM;
            $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN1_NORM;
            delete $scope.filtered[key].Camas_Interm_Adultos_PubN1_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        horizontalbar($scope.filtered, "#Hosp_PubN1","Hosp_PubN1_class","#Hosp_Pub_Size");
    });

    $scope.$parent.$parent.$parent.$parent.hosp_pubn1 = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;
            $scope.filtered = $scope.data[0].data.filter(function(d){
                console.log($scope.dataForm);
                return d.Departamento == $scope.dataForm;
            });

            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                    "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM","Camas_Interm_Adultos_Pri_NORM",
                    "Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM","Camas_Intens_Adultos_Pri_NORM",
                    "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN1_NORM;
                delete $scope.filtered[key].Camas_Adultos_PubN1_NORM;
                $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN1_NORM;
                delete $scope.filtered[key].Camas_Intens_Adultos_PubN1_NORM;
                $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN1_NORM;
                delete $scope.filtered[key].Camas_Interm_Adultos_PubN1_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            horizontalbar($scope.filtered, "#Hosp_PubN1","Hosp_PubN1_class","#Hosp_Pub_Size");
        });
    }
});

app.controller("Hosp_PubN2", function($scope, $http, $q){
    
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });

        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN3_NORM","Camas_Interm_Adultos_Pri_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN3_NORM","Camas_Intens_Adultos_Pri_NORM",
                "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN2_NORM;
            delete $scope.filtered[key].Camas_Adultos_PubN2_NORM;
            $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN2_NORM;
            delete $scope.filtered[key].Camas_Intens_Adultos_PubN2_NORM;
            $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN2_NORM;
            delete $scope.filtered[key].Camas_Interm_Adultos_PubN2_NORM;
        });
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        horizontalbar($scope.filtered, "#Hosp_PubN2","Hosp_PubN2_class","#Hosp_Pub_Size");
    });

    $scope.$parent.$parent.$parent.$parent.hosp_pubn2 = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });
            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                    "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN3_NORM","Camas_Interm_Adultos_Pri_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN3_NORM","Camas_Intens_Adultos_Pri_NORM",
                    "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN2_NORM;
                delete $scope.filtered[key].Camas_Adultos_PubN2_NORM;
                $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN2_NORM;
                delete $scope.filtered[key].Camas_Intens_Adultos_PubN2_NORM;
                $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN2_NORM;
                delete $scope.filtered[key].Camas_Interm_Adultos_PubN2_NORM;
            });
            $scope.filtered['columns'] = Object.keys($scope.filtered[0])
            horizontalbar($scope.filtered, "#Hosp_PubN2","Hosp_PubN2_class","#Hosp_Pub_Size")
        });
    }   
});

app.controller("Hosp_PubN3", function($scope, $http, $q){
    
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });

        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_Pri_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_Pri_NORM",
                "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN3_NORM;
            delete $scope.filtered[key].Camas_Adultos_PubN3_NORM;
            $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN3_NORM;
            delete $scope.filtered[key].Camas_Intens_Adultos_PubN3_NORM;
            $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN3_NORM;
            delete $scope.filtered[key].Camas_Interm_Adultos_PubN3_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        horizontalbar($scope.filtered, "#Hosp_PubN3","Hosp_PubN3_class","#Hosp_Pub_Size");
    });

    $scope.$parent.$parent.$parent.$parent.hosp_pubn3 = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });

            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                    "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_Pri_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_Pri_NORM",
                    "Camas_Adultos_Pri_NORM","Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_PubN3_NORM;
                delete $scope.filtered[key].Camas_Adultos_PubN3_NORM;
                $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_PubN3_NORM;
                delete $scope.filtered[key].Camas_Intens_Adultos_PubN3_NORM;
                $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_PubN3_NORM;
                delete $scope.filtered[key].Camas_Interm_Adultos_PubN3_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            horizontalbar($scope.filtered, "#Hosp_PubN3","Hosp_PubN3_class","#Hosp_Pub_Size");
        });
    }
});

app.controller("Hosp_Pri", function($scope, $http, $q){
    
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
            
        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_Pri_NORM;
            delete $scope.filtered[key].Camas_Adultos_Pri_NORM;
            $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_Pri_NORM;
            delete $scope.filtered[key].Camas_Intens_Adultos_Pri_NORM;
            $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_Pri_NORM;
            delete $scope.filtered[key].Camas_Interm_Adultos_Pri_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);            
        horizontalbar($scope.filtered, "#Hosp_Pri","Hosp_Pri_class","#Hosp_Pri_Size");
    });

    $scope.$parent.$parent.$parent.$parent.hosp_pri = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });
            
            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_UCIM_NORM","Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                    "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Departamento","Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key].General = $scope.filtered[key].Camas_Adultos_Pri_NORM;
                delete $scope.filtered[key].Camas_Adultos_Pri_NORM;
                $scope.filtered[key].UCI = $scope.filtered[key].Camas_Intens_Adultos_Pri_NORM;
                delete $scope.filtered[key].Camas_Intens_Adultos_Pri_NORM;
                $scope.filtered[key].UCIM = $scope.filtered[key].Camas_Interm_Adultos_Pri_NORM;
                delete $scope.filtered[key].Camas_Interm_Adultos_Pri_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);            
            horizontalbar($scope.filtered, "#Hosp_Pri","Hosp_Pri_class","#Hosp_Pri_Size");
        });
    }
});

app.controller("UCIM", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
        
        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key]["Todos"] = $scope.filtered[key].Contagiados_Hosp_UCIM_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_UCIM_NORM;
            $scope.filtered[key]["20-49"] = $scope.filtered[key].Contagiados_Hosp_Adultos_UCIM_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_Adultos_UCIM_NORM;
            $scope.filtered[key]["50-más"] = $scope.filtered[key].Contagiados_Hosp_Mayores_UCIM_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_Mayores_UCIM_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        verticalbar($scope.filtered, "#UCIM","UCIM_class","#UCIM_UCI_SIZE");
    });

    $scope.$parent.$parent.$parent.ucim = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });
            
            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCI_NORM",
                    "Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                    "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key]["Todos"] = $scope.filtered[key].Contagiados_Hosp_UCIM_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_UCIM_NORM;
                $scope.filtered[key]["20-49"] = $scope.filtered[key].Contagiados_Hosp_Adultos_UCIM_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_Adultos_UCIM_NORM;
                $scope.filtered[key]["50-más"] = $scope.filtered[key].Contagiados_Hosp_Mayores_UCIM_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_Mayores_UCIM_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            verticalbar($scope.filtered, "#UCIM","UCIM_class","#UCIM_UCI_SIZE");
        });
    }    
});

app.controller("UCI", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
        
        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                "Ventiladores_NORM",'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key]["Todos"] = $scope.filtered[key].Contagiados_Hosp_UCI_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_UCI_NORM;
            $scope.filtered[key]["20-49"] = $scope.filtered[key].Contagiados_Hosp_Adultos_UCI_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_Adultos_UCI_NORM;
            $scope.filtered[key]["50-más"] = $scope.filtered[key].Contagiados_Hosp_Mayores_UCI_NORM;
            delete $scope.filtered[key].Contagiados_Hosp_Mayores_UCI_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        verticalbar($scope.filtered, "#UCI","UCI_class","#UCIM_UCI_SIZE");
    });

    $scope.$parent.$parent.$parent.uci = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });

            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                    "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI",
                    "Camas Públicas UCIM Adultos","Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos",
                    "Camas Privadas UCI Adultos","Ventiladores_NORM",'Personal_Ap_N1_NORM',
                    'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key]["Todos"] = $scope.filtered[key].Contagiados_Hosp_UCI_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_UCI_NORM;
                $scope.filtered[key]["20-49"] = $scope.filtered[key].Contagiados_Hosp_Adultos_UCI_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_Adultos_UCI_NORM;
                $scope.filtered[key]["50-más"] = $scope.filtered[key].Contagiados_Hosp_Mayores_UCI_NORM;
                delete $scope.filtered[key].Contagiados_Hosp_Mayores_UCI_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            verticalbar($scope.filtered, "#UCI","UCI_class","#UCIM_UCI_SIZE");
        });
    }    
});

app.controller("Ventiladores", function($scope, $http, $q){
    //$scope.data = $http.get("web/Dispo-Hospitalaria/dispo-hospitalaria.json");
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
        
        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM",
                'Personal_Ap_N1_NORM',
                'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key]["Cantidad"] = $scope.filtered[key].Ventiladores_NORM;
            delete $scope.filtered[key].Ventiladores_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        verticalbar($scope.filtered, "#Ventiladores","Ventiladores_class","#Vent_Size");
    });

    $scope.$parent.$parent.$parent.vent = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });

            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                    "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                    "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                    "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM",
                    'Personal_Ap_N1_NORM',
                     'Personal_Ap_N2_NORM','Personal_Ap_N3_NORM','Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'

                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key]["Cantidad"] = $scope.filtered[key].Ventiladores_NORM;
                delete $scope.filtered[key].Ventiladores_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            verticalbar($scope.filtered, "#Ventiladores","Ventiladores_class","#Vent_Size");
        });
    }    
});

app.controller("Personal_Ap", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
        var length_filtered = [];
        
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Ventiladores_NORM",
                'Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key]["N1"] = $scope.filtered[key].Personal_Ap_N1_NORM;
            delete $scope.filtered[key].Personal_Ap_N1_NORM;
            $scope.filtered[key]["N2"] = $scope.filtered[key].Personal_Ap_N2_NORM;
            delete $scope.filtered[key].Personal_Ap_N2_NORM;
            $scope.filtered[key]["N3"] = $scope.filtered[key].Personal_Ap_N3_NORM;
            delete $scope.filtered[key].Personal_Ap_N3_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        verticalbar($scope.filtered, "#Personal_Ap","Personal_Ap_class","#Personal_Size");
    });

    $scope.$parent.$parent.$parent.personal_ap = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });

            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                    "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                    "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                    "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Ventiladores_NORM",
                    'Personal_Op_N1_NORM','Personal_Op_N2_NORM','Personal_Op_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key]["N1"] = $scope.filtered[key].Personal_Ap_N1_NORM;
                delete $scope.filtered[key].Personal_Ap_N1_NORM;
                $scope.filtered[key]["N2"] = $scope.filtered[key].Personal_Ap_N2_NORM;
                delete $scope.filtered[key].Personal_Ap_N2_NORM;
                $scope.filtered[key]["N3"] = $scope.filtered[key].Personal_Ap_N3_NORM;
                delete $scope.filtered[key].Personal_Ap_N3_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            verticalbar($scope.filtered, "#Personal_Ap","Personal_Ap_class","#Personal_Size");
        });
    }    
});

app.controller("Personal_Op", function($scope, $http, $q){
    $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
    $q.all([$scope.data]).then(function(d){
        $scope.data = d;        
            
        $scope.filtered = $scope.data[0].data.filter(function(d){
            return d.Departamento == "TODOS";
        });
        
        var length_filtered = [];
        for(var x=0; x <= $scope.filtered.length-1 ;x++){
            length_filtered.push(String(x));
        }

        length_filtered.forEach(key =>{
            [
                "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Ventiladores_NORM",
                'Personal_Ap_N1_NORM','Personal_Ap_N2_NORM','Personal_Ap_N3_NORM'
            ].forEach(value => {
                delete $scope.filtered[key][value]
            })
            $scope.filtered[key]["N1"] = $scope.filtered[key].Personal_Op_N1_NORM;
            delete $scope.filtered[key].Personal_Op_N1_NORM;
            $scope.filtered[key]["N2"] = $scope.filtered[key].Personal_Op_N2_NORM;
            delete $scope.filtered[key].Personal_Op_N2_NORM;
            $scope.filtered[key]["N3"] = $scope.filtered[key].Personal_Op_N3_NORM;
            delete $scope.filtered[key].Personal_Op_N3_NORM;
        })
        $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
        verticalbar($scope.filtered, "#Personal_Op","Personal_Op_class","#Personal_Size");
    });

    $scope.$parent.$parent.$parent.personal_op = function(){
        $scope.data = $http.get("https://s3.amazonaws.com/eys.devteam.com/data/dispo-hospitalaria.json");
        $q.all([$scope.data]).then(function(d){
            $scope.data = d;        
            
            $scope.filtered = $scope.data[0].data.filter(function(d){
                return d.Departamento == $scope.dataForm;
            });
            var length_filtered = [];
                for(var x=0; x <= $scope.filtered.length-1 ;x++){
                length_filtered.push(String(x));
            }

            length_filtered.forEach(key =>{
                [
                    "Contagiados_Hosp_Adultos_UCIM_P","Contagiados_Hosp_Mayores_UCIM_P","Contagiados_Hosp_UCIM_NORM",
                    "Contagiados_Hosp_Adultos_UCIM_NORM","Contagiados_Hosp_Mayores_UCIM_NORM","Contagiados_Hosp_Adultos_UCI_P",
                    "Contagiados_Hosp_Mayores_UCI_P","Camas_Adultos_PubN1_NORM","Camas_Adultos_PubN2_NORM","Camas_Adultos_PubN3_NORM",
                    "Camas_Interm_Adultos_PubN1_NORM","Camas_Interm_Adultos_PubN2_NORM","Camas_Interm_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_PubN1_NORM","Camas_Intens_Adultos_PubN2_NORM","Camas_Intens_Adultos_PubN3_NORM",
                    "Camas_Intens_Adultos_Pri_NORM","Camas_Interm_Adultos_Pri_NORM","Camas_Adultos_Pri_NORM","Departamento",
                    "Contagiados Hosp. Adultos UCIM","Contagiados Hosp. Adultos UCI","Camas Públicas UCIM Adultos",
                    "Camas Públicas UCI Adultos","Camas Privadas UCIM Adultos","Camas Privadas UCI Adultos",
                    "Contagiados_Hosp_UCI_NORM","Contagiados_Hosp_Adultos_UCI_NORM","Contagiados_Hosp_Mayores_UCI_NORM","Ventiladores_NORM",
                    'Personal_Ap_N1_NORM','Personal_Ap_N2_NORM','Personal_Ap_N3_NORM'
                ].forEach(value => {
                    delete $scope.filtered[key][value]
                })
                $scope.filtered[key]["N1"] = $scope.filtered[key].Personal_Op_N1_NORM;
                delete $scope.filtered[key].Personal_Op_N1_NORM;
                $scope.filtered[key]["N2"] = $scope.filtered[key].Personal_Op_N2_NORM;
                delete $scope.filtered[key].Personal_Op_N2_NORM;
                $scope.filtered[key]["N3"] = $scope.filtered[key].Personal_Op_N3_NORM;
                delete $scope.filtered[key].Personal_Op_N3_NORM;
            })
            $scope.filtered['columns'] = Object.keys($scope.filtered[0]);
            verticalbar($scope.filtered, "#Personal_Op","Personal_Op_class","#Personal_Size");
        });
    }    
});

app.controller("TabsController", function($scope){
    this.tab=1;
    this.selectTab = function(tab){
        this.tab=tab;
    };
});

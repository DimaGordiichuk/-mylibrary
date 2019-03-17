$(document).ready(function(){
    
    //вибір кольору
    $('#colorsSelector .colorItem').on('click', function(){
       var imgPath = $(this).attr('data-img-path');
       //console.log(imgPath);
       $('#imgHolder img').attr('src', imgPath);
    });
    
    var modelSpecs,//специфікація моделі
        modelPrice,//ціна моделі
        modelSpecsHolder,//підсумковий div куди поміщається
        modelPriceHolder,
        modelPriceUSDHolder;
        
        
    modelSpecsHolder = $('#modelSpecs');
    modelPriceHolder = $('#modelPrice');
    modelPriceUSDHolder = $('#modelPriceUSD');
    
    
    modelPrice = 0;
    modelSpecs = '';
    
    function calculatePrice(){
        var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
        var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
        var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();
        
        //приводимо значення modelPrice в числові 
        modelPriceEngine = parseInt(modelPriceEngine);
        modelPriceTransmission = parseInt(modelPriceTransmission);
        modelPricePackage = parseInt(modelPricePackage);
        
        //загальна сума
        modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
        //alert(modelPrice);
        
        modelPriceHolder.text(addSpace(modelPrice) + ' гривень');
        
    };
    
    //визначення специфікації
    function compileSpecs(){
        
        modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
        modelSpecs = modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
        modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text();
        //alert(modelSpecs);
        modelSpecsHolder.text(modelSpecs);
    };
    
    calculatePrice();
    compileSpecs();
    //calculateUSD();
    
    $('#autoForm input').on('change', function(){
       calculatePrice();
       compileSpecs();
       calculateUSD();
        
    });
    
  
        
   
   
   
   
   
   
 
   
   //функція добавляння пробілів 
   function addSpace(nStr){
       nStr += '';
       x = nStr.split('.');
       x1 = x[0];
       x2 = x.length > 1 ? '.' + x[1] : '';
       var rgx = /(\d+)(\d{3})/;
       while (rgx.test(x1)){
           x1 = x1.replace(rgx, '$1' + ' ' + '$2');
       }
       return x1 + x2;
   }
    
    
    //курс валют
    var currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3';
    var UaUsdRate = 0;
    
    $.ajax({
        url: currencyUrl,
        cache: false,
        success: function (html){
            console.log(html[2].buy);
            UaUsdRate = html[2].buy;
            calculateUSD();
        }
    });
    
    
    function calculateUSD(){
        
        var modelPriceUSD = modelPrice / UaUsdRate;
        //alert(modelPriceUSD);
        modelPriceUSDHolder.text( '$ ' + addSpace(modelPriceUSD.toFixed(0)));
    }
    
    
    
    
});









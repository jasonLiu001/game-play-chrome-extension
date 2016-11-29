/**
 *
 *
 * @summary 产生号码投注模块
 * */
function numberFactory(options) {
    var self = this;
    if (options === undefined) {
        var message = 'profit constructor have 1 argument.';
        console.error(message);
        throw new SyntaxError(message);
    }
    //上期开奖号码
    this.lastPrizeNumberString = options.lastPrizeNumberString;
    //上期期号
    this.lastPeriodNumberString = options.lastPeriodNumberString;
}

/**
 *
 *
 * @summary 根据上期的中奖号码 产生下一期的投注号码
 * @return {String} 返回投注号码字符
 * */
numberFactory.prototype.getInvestNumberString = function () {
    var self = this;

    /**
     * 完整后二100注
     * */
    function getTotalNumberArray() {
        var a = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], b = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var totalArray = [];
        for (var i = 0; i < a.length; i++) {
            for (var j = 0; j < b.length; j++) {
                totalArray.push(a[i] + '' + b[j]);
            }
        }
        return totalArray;
    }

    /**
     *
     * 获取号码的0,1,2路类型
     * */
    function getNumber012Type(num) {
        var restNumber = num % 3;
        return restNumber;
    }


    //开奖号码信息
    var prizeFirst = Number(self.lastPrizeNumberString.charAt(0));
    var prizeSecond = Number(self.lastPrizeNumberString.charAt(1));
    var prizeThird = Number(self.lastPrizeNumberString.charAt(2));
    var prizeForth = Number(self.lastPrizeNumberString.charAt(3));//5
    var prizeFifth = Number(self.lastPrizeNumberString.charAt(4));
    //开奖期号信息
    var periodFirst = Number(self.lastPeriodNumberString.charAt(0));
    var periodSecond = Number(self.lastPeriodNumberString.charAt(1));
    var periodThird = Number(self.lastPeriodNumberString.charAt(2));
    var totalNumberArray = getTotalNumberArray();
    //杀十位个位和
    var sum = prizeForth + prizeFifth;
    var firstFilterArray = [];
    for (var i = 0; i < totalNumberArray.length; i++) {
        var item = totalNumberArray[i];
        var first = Number(item.charAt(0));
        var second = Number(item.charAt(1));
        if ((first + second) == sum) {
            continue;
        }
        firstFilterArray.push(item);
    }
    //杀连号
    var secondFilterArray = [];
    for (var i = 0; i < firstFilterArray.length; i++) {
        var item = firstFilterArray[i];
        var first = Number(item.charAt(0));
        var second = Number(item.charAt(1));
        if (Math.abs(first - second) == 1 || Math.abs(first - second) == 9) {
            continue;
        }
        secondFilterArray.push(item);
    }
    //十位杀期号的个位 个位杀期号的十位
    var thirdFilterArray = [];
    for (var i = 0; i < secondFilterArray.length; i++) {
        var item = secondFilterArray[i];
        var first = Number(item.charAt(0));
        var second = Number(item.charAt(1));
        if (periodThird == first || periodSecond == second) {
            continue;
        }
        thirdFilterArray.push(item);
    }
    //当前号码的012路
    var forthFilterArray = [];
    //上期开奖号码后二的012路 倒杀
    var shiWei012Type = getNumber012Type(prizeForth);//十位012路类型
    var geWei012Type = getNumber012Type(prizeFifth);//个位012路类型
    for (var i = 0; i < thirdFilterArray.length; i++) {
        var item = secondFilterArray[i];
        var first012Type = getNumber012Type(Number(item.charAt(0)));
        var second012Type = getNumber012Type(Number(item.charAt(1)));
        if (geWei012Type == first012Type && shiWei012Type == second012Type) {
            continue;
        }
        forthFilterArray.push(item);
    }


    return forthFilterArray.join(' ');

};

/**
 *
 * @summary 上期的开奖号码是否满足当前投注条件
 * @return {Boolean} true满足条件 false:不满足条件
 * */
numberFactory.prototype.isNeededPrizeNumber = function () {
    var self = this;
    var first = Number(self.lastPrizeNumberString.charAt(0));
    var second = Number(self.lastPrizeNumberString.charAt(1));
    var third = Number(self.lastPrizeNumberString.charAt(2));
    var forth = Number(self.lastPrizeNumberString.charAt(3));//5
    var fifth = Number(self.lastPrizeNumberString.charAt(4));
    return true;
};

//Testing requirement.
//if(module){
//    module.exports = numberFactory;
//}
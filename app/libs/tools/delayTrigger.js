
/**
 * 延时堆叠触发器
 * 希望是单例模式
 * 所以没有输出delayTrigger的构造函数 只是输出了实例
 * @author marsoln
 */

class DelayTrigger {
    constructor() {
        this.triggerQueue = []
    }

    /**
     * 添加一个堆叠触发器
     * @param {!string} name 触发器归类堆叠的名称
     * @param {!function} callback 回调函数
     * @param {?object} thisObj 运行时this指向的对象
     * @param {?number} delaySpan 触发延迟
     */
    addTrigger(name, callback, thisObj, delaySpan) {
        this._enqueue({
            name: name,
            callbackFunc: callback,
            thisObj: thisObj || null,
            delay: delaySpan || 500
        })
    }


    /**
     * 将一个触发器加入队列
     * @param {object} trigger 触发器对象
     * @private
     */
    _enqueue(trigger) {
        var _triggers = this.find(trigger.name)
        if (_triggers.length > 0) {
            _triggers.forEach((_trigger) => {
                this._resetTicker(Object.assign(_trigger, trigger))
            })
        } else {
            this._createTicker(trigger)
            this.triggerQueue[this.triggerQueue.length] = trigger
        }
    }

    /**
     * 创建计时器
     * @param {object} trigger 触发器对象
     * @private
     */
    _createTicker(trigger) {
        trigger.flag = true
        trigger.ticker = setTimeout(() => {
            try {
                trigger.callbackFunc.call(trigger.thisObj, null)
            } finally {
                this._dequeue(trigger)
            }
        }, trigger.delay)
    }

    /**
     * 重置计时器
     * @param {object} trigger 触发器对象
     * @private
     */
    _resetTicker(trigger) {
        this._cancelTicker(trigger)
        this._createTicker(trigger)
    }

    /**
     * 取消计时器
     * @param {object} trigger 触发器对象
     * @private
     */
    _cancelTicker(trigger) {
        clearTimeout(trigger.ticker)
    }

    /**
     * 将一个触发器由队列中移除
     * @param {object} trigger 触发器对象
     * @private
     */
    _dequeue(trigger) {
        var i = this.triggerQueue.indexOf(trigger)
        if (i > -1) {
            this.triggerQueue.splice(i, 1)
        }
    }

    /**
     * 查找指定名称的触发器队列
     * @param {string} name 触发器归类堆叠名称
     * @return {array} 触发器队列
     */
    find(name) {
        return this.triggerQueue.filter((o) => o.name == name)
    }

    /**
     * 移除指定名称下的所有触发器
     * @param {string} name 触发器归类堆叠名称
     */
    removeTrigger(name) {
        this.find(name).map(this._cancelTicker)
    }
}

export default new DelayTrigger()

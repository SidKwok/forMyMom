module.exports = {
    sizeKeys: [
        's34',
        's35',
        's36',
        's37',
        's38',
        's39',
        's40',
        's41',
        's42',
        's43',
        's44'
    ],
    defineSizeStatus: ({ needed, sent }) => {
        // 对于一种鞋子的一种尺码来说
        let gap = needed - sent;
        switch (gap) {
            case needed:
                // 未发货
                return -1;
            case 0:
                // 已完成
                return 1;
            default:
                // 发货中
                return 0;
        }
    },
    defineStatus: arr => {
        if (arr.includes(-1) && !arr.includes(0) && !arr.includes(1)) {
            // 未发货
            return -1;
        } else if (arr.includes(1) && !arr.includes(0) && !arr.includes(-1)) {
            // 已完成
            return 1;
        } else {
            // 发货中
            return 0;
        }
    }
};

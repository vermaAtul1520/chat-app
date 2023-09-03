const genrateObject=(text)=>{
    return {
        text,
        createdAt:new Date().getTime()
    }
}

const genrateLocationObject=(url)=>{
    return {
        url,
        createdAt:new Date().getTime()
    }
}

module.exports={
    genrateObject,
    genrateLocationObject
} 
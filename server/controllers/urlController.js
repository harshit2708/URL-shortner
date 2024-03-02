const {StatusCodes} = require('http-status-codes')
const Url = require('../models/Url')
const base62 = require('base62');
const { nanoid } = require('nanoid')
const Sequence = require('../models/Sequence')

function generateSnowFlakeid(SequenceDoc){
    const timestamp = Date.now()

    if(timestamp === SequenceDoc.lastTimeStamp){
        SequenceDoc.sequence_val = (SequenceDoc.sequence_val + 1) % 4095
    } 
    else{
        SequenceDoc.sequence_val = 0
    }
    SequenceDoc.lastTimeStamp = timestamp
    SequenceDoc.save()
 
    const id = (( timestamp - 1609459200000) << 12) | (SequenceDoc.sequence_val & 4095)

    return Math.abs(id)
}
const getShortURL = async (req, res) => {
    const {originalUrl} = req.body
    console.log(originalUrl);
    
    const url_found = await Url.findOne({url: originalUrl})
    if(url_found){
        res.json(url_found)
    }
    else{
        const SequenceDoc = await Sequence.findByIdAndUpdate(
            {_id: 'UrlId'},
            {$inc:{sequence_val: 1}},
            {new: true, upsert: true}
        )
        const new_id = generateSnowFlakeid(SequenceDoc)
        id = base62.encode(new_id)
        const shorturl = `${process.env.BASE}/ap1/${id}`
        
        const newUrl = await Url.create({url:originalUrl, id , shorturl})
        res.status(StatusCodes.OK).json(newUrl)
    }
    
}
const getLongURL = async(req, res) => {
    const {id:shorturlid} = req.params
    console.log({url:shorturlid});
    const shorturlExists = await Url.findOne({id:shorturlid})
    console.log(shorturlExists);
    if(shorturlExists){
        res.redirect(shorturlExists.url)
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({msg:"Short url is not valid"})
    }
}

module.exports = {getShortURL, getLongURL}
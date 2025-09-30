import * as yup from 'yup';

//obs.: validateSync só olha os campos definidos aqui no schema

const schema = {
    list: {
        query: yup
            .object({
                page: yup.number().default(1).min(1),
            })
            .noUnknown(),
    },
    create: {
        
    }
}

export default {
    list: schema.list,
}
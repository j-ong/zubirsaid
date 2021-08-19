import neo4j from "neo4j-driver";


export const retrieveInfo = async (query=null,parameters=null) =>{
    let driver = neo4j.driver(
        'neo4j+s://74228951.databases.neo4j.io',
        neo4j.auth.basic('anonymous', 'anonymous')
        );
    let session = driver.session();
    let result;
    try {
        result = await session.readTransaction(
            tx=>{
                if(parameters===null){
                    tx.run(
                        query
                    );
                }
                else{
                    tx.run(
                        query,
                        parameters
                    );
                }
            }
        );


    } finally {
        await session.close();
    }

    // on application exit:
    await driver.close();
    return result;
}
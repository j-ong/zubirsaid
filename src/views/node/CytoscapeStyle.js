export const nodeStyle=(label=null)=>{
    return(
        {
            "shape":'round-rectangle',
            // boundingBox:true,
            // content: 'data(label)',
            "text-wrap" : "wrap",
            "text-max-width" : "200px",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"center",
        }
    )
}

export const nodeMainStyle=(label=null)=>{
    return(
        {
            label:label,
            // boundingBox:true,
            // content:"data(label)",
            "shape":'ellipse',
            "text-wrap" : "wrap",
            "text-max-width" : "200px",
            "background-color":"#add8e6",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"center",

        }
    )
}


export const edgeStyle=(label=null)=>{
    return(
        {
            label:label,
            // content:"data(label)",
            "text-rotation":"autorotate",
            "font-size":'10px',
            "text-wrap":"wrap",
            "text-max-width":100,
            "text-overflow-wrap":"whitespace",
            "text-halign":"center",
            "text-valign":"top",
        }
    )
}

export const cytoscapeStylesheet = {

}

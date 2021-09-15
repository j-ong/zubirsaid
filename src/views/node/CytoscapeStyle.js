export const nodeStyle=(label=null)=>{
    return(
        {
            "shape":'round-rectangle',
            // boundingBox:true,
            // content: 'data(label)',
            "text-wrap" : "wrap",
            "text-overflow-wrap":"whitespace",
            "text-max-width" : "80px",
            "background-color":"#cec6a8",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-halign":"center",
            "text-valign":"center",
            "width": label.length*3,
            "height":label.length*3,
            'curve-style': 'cola',
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
            "text-overflow-wrap":"whitespace",
            "text-max-width" : "80px",
            "background-color":"#f2eae0",
            "font-size":'10px',
            "compound-sizing-wrt-labels":"include",
            "text-halign":"center",
            "text-valign":"center",
            "width": label.length*3,
            "height":label.length*3,
            'curve-style': 'cola',

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
            "text-overflow-wrap":"whitespace",
            "text-max-width":100,
            "background-color":"#90CAF9",
            "text-halign":"center",
            "text-valign":"top",
        }
    )
}

export const cytoscapeStylesheet = {

}

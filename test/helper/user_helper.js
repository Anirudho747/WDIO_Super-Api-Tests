export const giveRandomMessageForBeforeHook = async()=>{

    const msg = "before hook message " + Math.random();
    return msg;
}

export const giveRandomMessageForAfterHook = async()=>{

    const msg = "after hook message " + Math.random();
    return msg;
}

export const giveRandomMessageForBeforeEachHook = async()=>{

    const msg = "before each hook message " + Math.random();
    return msg;
}

export const giveRandomMessageForAfterEachHook = async()=>{

    const msg = "after each hook message " + Math.random();
    return msg;
}
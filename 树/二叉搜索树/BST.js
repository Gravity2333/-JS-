class TreeNode {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor() {
        this.root = null
    }
    
    _insertNode(node,newNode){
        if(!node){
            return 
        }
        if(node.key >= newNode.key){
            if(node.left === null){
                node.left = newNode
            }else{
                this._insertNode(node.left,newNode)
            }
        }else{
            if(node.right === null){
                node.right = newNode
            }else{
                this._insertNode(node.right,newNode)
            }
        }
    }

    _searchNode(node,key){
        if(!node){
            return false
        }
        if(node.key === key){
            return true
        }
        if(node.key > key){
            // LT找
            return this._searchNode(node.left,key)
        }else{  
            //RT找
            return this._searchNode(node.right,key)
        }
    }

    _preOrderTraversal(node,onTraverse){
        if(!node){
            return
        }
        onTraverse(node.key)
        this._preOrderTraversal(node.left,onTraverse)
        this._preOrderTraversal(node.right,onTraverse)
    }

    _inOrderTraversal(node,onTraverse){
        if(!node){
            return
        }
        this._inOrderTraversal(node.left,onTraverse)
        onTraverse(node.key)
        this._inOrderTraversal(node.right,onTraverse)
    }

    _postOrderTraversal(node,onTraverse){
        if(!node){
            return
        }
        this._postOrderTraversal(node.left,onTraverse)
        this._postOrderTraversal(node.right,onTraverse)
        onTraverse(node.key)
    }

    _levelTraversal(node,onTraverse){
        if(!node){
            return
        }
        const queue = [node]
        while(queue.length>0){
            const treeNode = queue.shift()
            onTraverse(treeNode.key)
            if(treeNode.left){
                queue.push(treeNode.left)
            }
            if(treeNode.right){
                queue.push(treeNode.right)
            }
        }
    }

    // 插入数据
    insert(key){
        const treeNode = new TreeNode(key)
        if(!this.root){
            this.root = treeNode
        }else{
            this._insertNode(this.root,treeNode)
        }
    }

    // 搜索
    search(key){
        return this._searchNode(this.root,key)
    }

    // 深度优先搜索 先序
    preOrderTraversal(){
        const list = []
        this._preOrderTraversal(this.root,(key)=>{
            list.push(key)
        })
        return list.join(',')
    }

    // 中序 - 排序
    inOrderTraversal(){
        const list = []
        this._inOrderTraversal(this.root,(key)=>{
            list.push(key)
        })
        return list.join(',')
    }

    // 后序
    postOrderTraversal(){
        const list = []
        this._postOrderTraversal(this.root,(key)=>{
            list.push(key)
        })
        return list.join(',')
    }

    // 广度优先搜索 - level traversal
    levelTraversal(){
        const list = []
        this._levelTraversal(this.root,(key)=>{
            list.push(key)
        })
        return list.join(',')
    }

    min(){
        let node = this.root
        if(!node){
            return
        }
        while(node.left!==null){
            node = node.left
        }
        return node.key
    }

    max(){
        let node = this.root
        if(!node){
            return
        }
        while(node.right!==null){
            node = node.right
        }
        return node.key 
    }
}

/**
 *          10
 *     9          11
 *  1                20
 *    3                 100
 */
const bstTree = new Tree()
bstTree.insert(10)
bstTree.insert(9)
bstTree.insert(11)
bstTree.insert(20)
bstTree.insert(1)
bstTree.insert(3)
bstTree.insert(100)
console.log(bstTree)
console.log(bstTree.search(66),bstTree.search(67))
console.log(bstTree.preOrderTraversal())
console.log(bstTree.inOrderTraversal())
console.log(bstTree.postOrderTraversal())
console.log(bstTree.levelTraversal())
console.log(bstTree.min(),bstTree.max())
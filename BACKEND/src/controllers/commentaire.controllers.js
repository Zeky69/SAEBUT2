const CommentaireService = require("../services/commentaire.service");


exports.getCommentaire = async (req, res) => {
    try {
       let reponse = await CommentaireService.getCommentaire(req);
         if (reponse.error === 0) {
              return res.status(200).send(reponse.data);
         }
            return res.status(401).send(reponse.data);
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"};
    }
}

exports.createCommentaire = async (req, res) => {
    try {
        let reponse = await CommentaireService.createCommentaire(req);
        if (reponse.error === 0) {
            return res.status(200).send(reponse.data);
        }
        return res.status(401).send(reponse.data);
    } catch (error) {
        console.error(error);
        return { error: 1 , data: "Server Error"};
    }
}
//admin.controllers.js
const adminService = require('../services/admin.service');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
    
        if (users.length === 0) {
          return res.status(404).json({ message: 'Aucun utilisateur trouvé' });
        }
        console.log(users)
    
        res.status(200).json(users);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
      }
};

exports.updatePrestataireStatus = async (req, res) => {
    const prestataire_id = req.params.prestataire_id;
    const { etat_id, user_id  } = req.body;
    try {
        switch (etat_id) {
            case 2:
                await adminService.acceptPrestataire(user_id, prestataire_id);
                res.status(200).json({ message: 'Prestataire accepté avec succès' });
                break;
            case 3:
                await adminService.refusePrestataire(prestataire_id);
                res.status(200).json({ message: 'Prestataire refusé avec succès' });
                break;
            default:
                res.status(400).json({ message: 'État non pris en charge' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour du prestataire:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}
exports.saveUser = (req, res) => {
    adminService.createUser(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User saved successfully");
    })
};

exports.deleteUser = (req,res) => {
    adminService.deleteUser(req, (error,data)=> {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User deleted successfully");
    })
};

exports.changeUser = (req, res) => {
    adminService.changeUser(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User updated successfully");
    })
};

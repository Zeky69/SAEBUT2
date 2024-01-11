const batimentService = require('../services/batiment.service');

exports.getBatByIdPrestataire = async (req, res) => {
    const idPresta = req.params.idPresta;
    try {
        const batiment = await batimentService.getBatByIdPrestataire(idPresta);
        if (batiment.length === 0) {
            return res.status(404).json({ message: 'Aucun batiment trouvé' });
        }
        res.status(200).json(batiment);
    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des batiments' });
    }
}
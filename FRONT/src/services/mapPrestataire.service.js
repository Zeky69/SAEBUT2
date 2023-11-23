import {getRequest, fetch} from "@/services/axios.service"


async function getAllEmpFromAPI(filtre) {
  return getRequest('/mapPrestataires/emp?filtre='+filtre, 'GETALLEMP')
}

async function getAllEmp(filtre) {
    let answer = await getAllEmpFromAPI(filtre)
    return answer
}

async function createEmpFromAPI(data) {
    const url = '/mapPrestataires/addemp';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez d'autres en-têtes si nécessaire
            },
            body: data,
        });

        if (!response.ok) {
            // Gérer les erreurs de réponse ici
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return await response.json(); // ou retournez simplement une indication de succès si aucun corps n'est attendu
    } catch (error) {
        console.error('Erreur lors de la création de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function createEmp(data) {
    try {
        let answer = await createEmpFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la création de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


async function deleteEmpFromAPI(data) {
    const url = `/mapPrestataires/delemp`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez d'autres en-têtes si nécessaire
            },
            body: JSON.stringify(data), // Convertir l'objet data en une chaîne JSON
        });

        if (!response.ok) {
            // Gérer les erreurs de réponse ici
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        return await response.json(); // ou retournez simplement une indication de succès si aucun corps n'est attendu
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function deleteEmp(data) {
    try {
        let answer = await deleteEmpFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


export {
    getAllEmp,
    createEmp,
    deleteEmp
}
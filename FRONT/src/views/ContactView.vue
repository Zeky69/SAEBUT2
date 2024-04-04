<template>
    <div class="contact-container">
        <div class="page-banner">
            <div class="image-container">
                <div class="blurred-image"></div>
                <div class="sharp-image"></div>
            </div>
            <div class="gradient-overlay"></div>
            <div class="text_top">
                <p class="title_top">{{ $t('contactUs.title') }}</p>
                <p class="subtitle_top">{{ $t('contactUs.subtitle') }}</p>
            </div>
        </div>
        <div class="contact-page">
            <form @submit.prevent="sendContact" class="contact-form">
                <div class="form-group">
                    <h3 class="instructions">{{ $t('contactUs.fillOut') }}</h3>
                    <div class="form-row">
                        <div class="col">
                            <label for="name">{{ $t('contactUs.form.name') }}</label>
                            <input type="text" class="form-control" id="name" v-model="contact.name"
                                :placeholder="$t('contactUs.form.placeholders.name')">
                            <span v-if="submitted && !contact.name" class="text-danger">{{
                    $t('contactUs.form.errors[0]') }}</span>
                        </div>
                        <div class="col">
                            <label for="firstname">{{ $t('contactUs.form.firstName') }}</label>
                            <input type="text" class="form-control" id="firstname" v-model="contact.firstname"
                                :placeholder="$t('contactUs.form.placeholders.firstName')">
                            <span v-if="submitted && !contact.firstname" class="text-danger">{{
                    $t('contactUs.form.errors[1]') }}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email">{{ $t('contactUs.form.email') }}</label>
                    <input type="email" class="form-control" id="email" v-model="contact.email"
                        :placeholder="$t('contactUs.form.placeholders.email')">
                    <span v-if="submitted && !contact.email" class="text-danger">{{ $t('contactUs.form.errors[2]')
                        }}</span>
                    <span v-else-if="submitted && !validEmail" class="text-danger">{{ $t('contactUs.form.errors[5]')
                        }}</span>
                </div>
                <div class="form-group">
                    <label for="subject">{{ $t('contactUs.form.subject') }}</label>
                    <input type="text" class="form-control" id="subject" v-model="contact.subject"
                        :placeholder="$t('contactUs.form.placeholders.subject')">
                    <span v-if="submitted && !contact.subject" class="text-danger">{{
                    $t('contactUs.form.errors[3]') }}</span>
                </div>
                <div class="form-group">
                    <label for="message">{{ $t('contactUs.form.message') }}</label>
                    <textarea class="form-control" id="message" v-model="contact.message" rows="5"
                        :placeholder="$t('contactUs.form.placeholders.message')"></textarea>
                    <span v-if="submitted && !contact.message" class="text-danger">{{
                    $t('contactUs.form.errors[4]') }}</span>
                </div>
                <button type="submit" class="btn btn-primary">{{ $t('contactUs.form.button') }}</button>
            </form>
        </div>

        <!-- Modal personnalisé -->
        <success-modal 
        :show="successModalVisible" 
        @update:show="successModalVisible = $event" 
        :title="$t('contactUs.form.modal.title')"
        :message="$t('contactUs.form.modal.content')" 
        :button-text="$t('contactUs.form.modal.button')"
        @close="redirectToHome"></success-modal>


    </div>
</template>


<script>
import serviceUser from '@/services/utilisateur'
import SuccessModal from '@/components/SuccessModal.vue'

export default {
    name: 'ContactView',
    components: {
        SuccessModal
    },
    data() {
        return {
            contact: {
                name: '',
                firstname: '',
                email: '',
                subject: '',
                message: ''
            },
            submitted: false,
            successModalVisible: false
        };
    },
    computed: {
        validEmail() {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(this.contact.email);
        }
    },
    methods: {
        async sendContact() {
            this.submitted = true;
            if (
                this.contact.name &&
                this.contact.firstname &&
                this.validEmail &&
                this.contact.subject &&
                this.contact.message
            ) {
                try {
                    await serviceUser.sendContact(
                        this.contact.firstname,
                        this.contact.name,
                        this.contact.email,
                        this.contact.subject,
                        this.contact.message
                    );
                    this.successModalVisible = true;
                } catch (error) {
                    console.error("Erreur lors de l'envoi du message", error.message);
                }
            }
        },
        redirectToHome() {
            this.$router.push({ name: "HomePage" });
        }
    }
}
</script>

<style scoped>
img {
    pointer-events: none;
}


.page-banner {
    position: relative;
    height: 30em;
}

.image-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.sharp-image {
    background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    filter: blur(9px);
}


.blurred-image {
    background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 2;
}


.text_top {
    position: absolute;
    top: 50%;
    left: -5%;
    color: white;
    z-index: 3;
}

.title_top {
    font-size: 3em;
    margin-bottom: 0.5em;
    font-weight: bold;
    margin-left: 5em;
}

.subtitle_top {
    font-size: 2em;
    left: 50%;
    transform: translateX(40%);
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 3;
}

.contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
}

.contact-form {
    width: 100%;
    max-width: 600px;
    padding: 60px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.form-group {
    margin-bottom: 25px;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.form-row .col {
    width: calc(50% - 5%);
}

.form-control {
    width: 97%;
    height: 50px;
    font-size: 16px;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    border-color: #007bff;
    outline: none;
}

textarea.form-control {
    height: 200px;
    resize: vertical;
}

button.btn-primary {
    width: 100%;
    height: 50px;
    font-size: 18px;
    border-radius: 20px;
    border: none;
    background-color: #6b5481;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button.btn-primary:hover {
    background-color: #ffffff;
    color: #6b5481;
    /** outline de couleur #6b5481 */
    border: 1px solid #6b5481;
}

.text-danger {
    font-size: 14px;
    margin-top: 5px;
    color: red;
    display: block;
    /* Pour forcer les messages d'erreur à afficher sous les champs */
}

.instructions {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
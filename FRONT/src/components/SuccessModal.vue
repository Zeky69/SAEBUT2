<template>
    <div class="modal" v-if="show" @click.self="hideModal"
        style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
        <div class="modal-dialog" style="background-color: white; padding: 20px; border-radius: 10px;">
            <div class="modal-content">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <h5 class="modal-title">{{ title }}</h5> <button type="button" class="close-button"
                        @click="hideModal">&times;</button>
                </div>
                <div class="modal-body" style="text-align: center;">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer" style="text-align: center;"> <button type="button" class="modal-button"
                        @click="hideModal">{{ buttonText }}</button> </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props: {
        title: String, message: String, buttonText: String, show: Boolean
    }, methods: {
        showModal() {
            this.$emit('update:show', true);
        }, hideModal() {
            this.$emit('update:show', false);
            this.$emit('close');
        }
    }
};

</script>

<style
    scoped>

    /* Styles CSS pour le modal */
    .modal-button {
        background-color: #4CAF50;
        /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
    }

    .modal-button:hover {
        background-color: #3e8e41;
    }

    .close-button {
        background-color: transparent;
        border: none;
        color: #000;
        font-size: 20px;
        cursor: pointer;
    }

    .close-button:hover {
        color: #6b5481;
    }
</style>
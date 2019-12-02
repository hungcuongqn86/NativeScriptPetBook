import {Component, OnInit} from "@angular/core";
import {PetService} from "~/app/shared/pet.service";
import {appName} from "~/app/const";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private petService: PetService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getPets();
    }

    getPets() {
        this.petService
            .getPets()
            .subscribe(res => {
                if (res.status) {
                    console.log(res);
                }
            }, (error) => {
                console.log(error);
                this.alert('Lỗi load dữ liệu pet!');
            });
    }

    alert(message: string) {
        return alert({
            title: appName,
            okButtonText: "OK",
            message: message
        });
    }
}

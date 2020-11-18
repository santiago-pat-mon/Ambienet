"""post sealizer"""
#Django
from django.core.mail import send_mail

#Django REST Framework
from rest_framework import serializers

#Models
from AmbieNet.posts.models import Post
from AmbieNet.users.models import User
from AmbieNet.users.models import Profile

from AmbieNet.users.serializers.profiles import ProfileModelSerializer

class PostModelSerializer(serializers.ModelSerializer):

    profile = ProfileModelSerializer(read_only=True)
    class Meta:
        """Meta Class"""
        model = Post
        
        fields = (
            'user',
            'title',
            'description',
            'type_catastrophe',
            'latitude',
            'longitude',
            'photo',
            'validator_number',
            'created',
            'id',
            'username',
            'profile'
            
        )

        read_only_fields = (
            'user',
            'title',
            'latitud',
            'longitud',
            'photo',
            'type_catastrophe',
            'created',
            'id',
            'username'
        )

class PostCreateSerializer(serializers.Serializer):


    user = serializers.CharField(
        min_length = 1,
        max_length = 50
    )

    photo = serializers.CharField(
        max_length = 255
    )

    title = serializers.CharField(
        min_length = 5,
        max_length = 50
    )

    description = serializers.CharField(
        min_length = 5,
        max_length = 255
    )

    type_catastrophe = serializers.CharField (
        min_length = 2,
        max_length = 20
    )

    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
   

 
    def create(self, data):
        #Modificar esta busqueda manual, esto se debe sacar por el self, no entiendo porque pero asi dice don suaza :D
        user = User.objects.get(username=data['user'])
        username = user.username
        profile = Profile.objects.get(user=user)
        data.pop('user')
        post = Post.objects.create(user=user, username=username, profile=profile,**data)

        """making of ubication posts."""
        data= {
            'latitude': post.latitude,
            'longitude': post.longitude
        }
        self.define_perimeter(data=data) 
       
        return post


    def define_perimeter(self, data):
        """Handle of calculate the perimeter of disaster.""" 
        profiles = Profile.objects.all()
        mails_users_affected = []
        for profile in profiles: 
            if(profile.longitude>=(data['longitude'] - 0.000010) and profile.longitude <= (data['longitude'] + 0.000010) and profile.latitude >= (data['latitude'] - 0.000010) and profile.latitude<= (data['latitude'] + 0.000010)):
                

                import pdb; pdb.set_trace()



                subject = 'Mensaje de alerta de castastrofe ambiental cercana'
                message = 'Se le informa que en una locación cerca al lugar donde usted recide, ha ocurrido una catastrofe. Se le recomienda discresión'
                from_email = 'AmbieNet <noreply@ambienet.com>'   
                mail = "{}".format(User.objects.get(profile=profile).email)
                send_mail(subject, message, from_email, [mail])
            #mails_users_affected.append(User.objects.get(profile=profile).email)


        
        #self.send_email_alert(mails= mails_users_affected) 
          

    def send_email_alert(self, mails):
        subject = 'Mensaje de alerta de castastrofe ambiental cercana'
        message = 'Se le informa que en una locación cerca al lugar donde usted recide, ha ocurrido una catastrofe. Se le recomienda discresión'
        from_email = 'AmbieNet <noreply@ambienet.com>'

        users_mails = []
        users_mails = mails
        print('Correos de los usuarios---------------------------------- {}'.format(users_mails))
     
        datatuple = (subject, message, from_email, [users_mails])
        number_sent_mails = send_mail(subject, message, from_email, [users_mails])

        print('Correos enviados de alerta: ' + str(number_sent_mails))
        



